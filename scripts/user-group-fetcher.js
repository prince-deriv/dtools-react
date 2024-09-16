import fetch from "node-fetch";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ORGS = [
  "https://github.com/orgs/regentmarkets",
  "https://github.com/orgs/deriv-com",
  "https://github.com/orgs/binary-com",
];

const GITHUB_TOKEN = ""; // Insert your GitHub personal access token

// Helper function to fetch data from GitHub API
const fetchFromGitHub = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
};

// Fetch teams for a given organization
const fetchTeams = async (orgName) => {
  const teamsUrl = `https://api.github.com/orgs/${orgName}/teams`;
  return await fetchFromGitHub(teamsUrl);
};

// Fetch members of a team
const fetchTeamMembers = async (orgName, teamSlug) => {
  const membersUrl = `https://api.github.com/orgs/${orgName}/teams/${teamSlug}/members`;
  return await fetchFromGitHub(membersUrl);
};

// Fetch repositories of a team
const fetchTeamRepos = async (orgName, teamSlug) => {
  const reposUrl = `https://api.github.com/orgs/${orgName}/teams/${teamSlug}/repos`;
  return await fetchFromGitHub(reposUrl);
};

// Fetch user details (including profile image and URL)
const fetchUserDetails = async (username) => {
  const userUrl = `https://api.github.com/users/${username}`;
  return await fetchFromGitHub(userUrl);
};

// Function to fetch data for each organization
const getOrgTeamsData = async (orgUrl) => {
  const orgName = orgUrl.split("/").pop(); // Extract organization name from URL
  const teamsData = await fetchTeams(orgName);

  const orgTeams = await Promise.all(
    teamsData.map(async (team) => {
      const [members, repos] = await Promise.all([
        fetchTeamMembers(orgName, team.slug),
        fetchTeamRepos(orgName, team.slug),
      ]);

      return {
        name: team.name,
        users: members.map((member) => member.login),
        repositories: repos.map((repo) => ({
          ...repo,
          organization: orgName,
        })),
      };
    })
  );

  return { orgName, teams: orgTeams };
};

// Function to group users based on their repositories and teams
const groupUsersByTeamsAndRepos = async (orgsData) => {
  const usersMap = {};
  const repositoriesMap = {};
  const teamsMap = {};

  for (const { teams } of orgsData) {
    for (const team of teams) {
      // Process team members and assign their repositories
      for (const user of team.users) {
        if (!usersMap[user]) {
          const userDetails = await fetchUserDetails(user);
          usersMap[user] = {
            user,
            avatar_url: userDetails.avatar_url,
            profile_url: userDetails.html_url,
            repositories: new Set(),
            teams: new Set(),
          };
        }
        usersMap[user].teams.add(team.name);
        team.repositories.forEach((repo) =>
          usersMap[user].repositories.add(repo.full_name)
        );
      }

      // Process repositories and assign users and teams
      team.repositories.forEach((repo) => {
        if (!repositoriesMap[repo.full_name]) {
          repositoriesMap[repo.full_name] = {
            repository: repo.full_name,
            organization: repo.organization,
            user_groups: new Set(),
            users: new Set(),
          };
        }
        repositoriesMap[repo.full_name].user_groups.add(team.name);
        team.users.forEach((user) =>
          repositoriesMap[repo.full_name].users.add(user)
        );
      });

      // Collect team data
      teamsMap[team.name] = {
        team: team.name,
        users: team.users,
        repositories: team.repositories.map((repo) => repo.full_name),
      };
    }
  }

  // Convert Sets to Arrays and return the user, repository, and team arrays
  const users = Object.values(usersMap).map((user) => ({
    ...user,
    repositories: Array.from(user.repositories),
    teams: Array.from(user.teams),
  }));

  const repositories = Object.values(repositoriesMap).map((repo) => ({
    ...repo,
    user_groups: Array.from(repo.user_groups),
    users: Array.from(repo.users),
  }));

  const teams = Object.values(teamsMap);

  return { users, repositories, teams };
};

// Function to save data to JSON files
const saveDataToFile = async (data, filename) => {
  const filePath = path.join(process.cwd(), `src/data/${filename}`);
  await mkdir(path.dirname(filePath), { recursive: true }); // Ensure the directory exists
  await writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filePath}`);
};

// Fetch all organization data and generate users, repositories, and teams data
const fetchAllOrgData = async () => {
  try {
    const allOrgsData = await Promise.all(ORGS.map(getOrgTeamsData));
    const { users, repositories, teams } = await groupUsersByTeamsAndRepos(
      allOrgsData
    );

    // Save users, repositories, and teams data to separate files
    await saveDataToFile(users, "user-list.json");
    await saveDataToFile(repositories, "repository-list.json");
    await saveDataToFile(teams, "team-list.json");
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
};

fetchAllOrgData();
