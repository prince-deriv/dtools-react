import fetch from "node-fetch";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ORGS = [
  "https://github.com/orgs/regentmarkets",
  "https://github.com/orgs/deriv-com",
  "https://github.com/orgs/binary-com",
];

const GITHUB_TOKEN = "";

// Helper function to fetch data from GitHub API
const fetchFromGitHub = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
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

// Main function to fetch all teams with their members and repositories
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
        repositories: repos.map((repo) => repo.full_name),
      };
    })
  );

  return { [orgName]: { teams: orgTeams } };
};

// Function to save data to a JSON file
const saveDataToFile = async (data) => {
  const filePath = path.join(process.cwd(), "src/data/user-group.json");
  await mkdir(path.dirname(filePath), { recursive: true }); // Ensure the directory exists
  await writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filePath}`);
};

// Fetch data for all organizations
const fetchAllOrgData = async () => {
  const allOrgsData = await Promise.all(ORGS.map(getOrgTeamsData));
  const result = allOrgsData.reduce(
    (acc, orgData) => ({ ...acc, ...orgData }),
    {}
  );
  await saveDataToFile(result);
};

fetchAllOrgData();
