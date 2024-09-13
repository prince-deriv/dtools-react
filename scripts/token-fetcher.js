import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import customProperties from "postcss-custom-properties";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get the latest package version
async function getLatestPackageVersion(packageName) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    const data = await response.json();
    const versions = Object.keys(data.versions);
    return versions.pop(); // Get the latest version
  } catch (error) {
    console.error(
      `Failed to fetch the latest version for ${packageName}:`,
      error
    );
    return null;
  }
}

// Function to fetch the CSS file from the package
async function fetchCSS(packageName, version, filePath) {
  const url = `https://unpkg.com/${packageName}@${version}/${filePath}`;
  console.log(`Fetching CSS from: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch CSS: ${error}`);
    return null;
  }
}

// Function to parse CSS content and extract variables
async function parseCSSContent(cssText) {
  const cssVariables = {};

  function cleanValue(value) {
    return value
      .replace(/\s+/g, " ") // Replace multiple spaces and newlines with a single space
      .trim(); // Remove leading and trailing whitespace
  }

  try {
    const result = await postcss([customProperties()]).process(cssText, {
      from: undefined,
    });

    result.root.walkDecls((declaration) => {
      if (declaration.prop.startsWith("--")) {
        const variableName = declaration.prop;
        const rawValue = declaration.value;
        const cleanedValue = cleanValue(rawValue);
        cssVariables[variableName] = cleanedValue;
      }
    });
  } catch (error) {
    console.error("Failed to parse CSS:", error);
  }

  return cssVariables;
}

// Function to save data as JSON in the public directory
function saveJSON(data) {
  // Resolve the path to the "public" directory from the current script's directory
  const publicDir = path.resolve(__dirname, "..", "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const filePath = path.join(publicDir, "quill-tokens.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`Data saved to ${filePath}`);
}

// Main function to fetch the latest version and save the CSS variables
async function processLatestVersion(packageName, filePath) {
  const latestVersion = await getLatestPackageVersion(packageName);
  if (!latestVersion) {
    console.log(`No latest version found for ${packageName}.`);
    return;
  }

  console.log(`Processing latest version ${latestVersion}...`);
  const cssText = await fetchCSS(packageName, latestVersion, filePath);
  if (cssText) {
    const cssVariables = await parseCSSContent(cssText);
    if (Object.keys(cssVariables).length > 0) {
      saveJSON(cssVariables); // Save only the key-value object
    } else {
      console.log("No CSS variables found.");
    }
  }
}

// Start the process with the latest version
processLatestVersion("@deriv-com/quill-tokens", "dist/quill.css");
