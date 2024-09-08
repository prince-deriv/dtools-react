import { getContainer } from "./controller.js";

const loadDToolsProduction = () => {
  if (document.getElementById("dtools-container")) return;
  const container = getContainer("dtools-container");
  document.body.appendChild(container);

  (function () {
    const appSrc = "https://prince-deriv.github.io/dtools-react";
    const cacheBuster = new Date().getTime();

    fetch(`${appSrc}/asset-manifest.json?t=${cacheBuster}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((manifest) => {
        const scriptHash = manifest.files["main.js"];
        const cssHash = manifest.files["main.css"];

        console.log({ scriptHash, cssHash });

        if (cssHash) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssHash;
          document.head.appendChild(link);
        } else {
          console.error("main.css file not found in asset-manifest.json");
        }

        if (scriptHash) {
          const reactAppDiv = document.createElement("div");
          reactAppDiv.id = "react-app-root";
          document.getElementById("dtools-container").append(reactAppDiv);

          const script = document.createElement("script");
          script.src = scriptHash;

          document.head.appendChild(script);
        } else {
          console.error("main.js file not found in asset-manifest.json");
        }
      })
      .catch((error) => {
        console.error("Error fetching manifest:", error);
      });
  })();
};

loadDToolsProduction();
