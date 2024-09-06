// (function () {
//   const appSrc = "https://prince-deriv.github.io/dtools-react";
//   const cacheBuster = new Date().getTime();

//   fetch(`${appSrc}/asset-manifest.json?t=${cacheBuster}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((manifest) => {
//       const scriptHash = manifest.files["main.js"];
//       const cssHash = manifest.files["main.css"];

//       console.log({ scriptHash, cssHash });

//       if (cssHash) {
//         const link = document.createElement("link");
//         link.rel = "stylesheet";
//         link.href = cssHash;
//         document.head.appendChild(link);
//       } else {
//         console.error("main.css file not found in asset-manifest.json");
//       }

//       if (scriptHash) {
//         const reactAppDiv = document.createElement("div");
//         reactAppDiv.id = "react-app-root";
//         document.getElementById("dtools-container").innerHTML = "";
//         document.getElementById("dtools-container").append(reactAppDiv);

//         const script = document.createElement("script");
//         script.src = scriptHash;

//         document.head.appendChild(script);
//       } else {
//         console.error("main.js file not found in asset-manifest.json");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching manifest:", error);
//     });
// })();

// Dtools Bookmark
// javascript:(function() {
//   function loadScript(src, callback) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'module';
//     script.onload = function() {
//       if (typeof callback === 'function') {
//         callback();
//       }
//     };
//     script.onerror = function() {
//       console.error(`Failed to load the script: ${src}`);
//     };
//     document.head.appendChild(script);
//   }

//   loadScript('https://prince-deriv.github.io/dtools-react/inject.js', function() {
//     if (typeof loadDToolsProduction === 'function') {
//       loadDToolsProduction();
//     }
//   });
// })();

const loadDToolsProduction = () => {
  if (document.getElementById("dtools-container")) return;
  const container = document.createElement("div");
  container.id = "dtools-container";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.right = "10px";
  container.style.width = "350px";
  container.style.height = "500px";
  container.style.backgroundColor = "white";
  container.style.boxShadow = "#000000 0px 0px 10px";
  container.style.borderRadius = "10px 10px 0px 0px";
  container.style.zIndex = "999999";
  container.style.overflow = "hidden";
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
          document.getElementById("dtools-container").innerHTML = "";
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

const loadDToolsLocal = () => {
  if (document.getElementById("dtools-container-local")) return;
  const container = document.createElement("div");
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:8888/dtools-react";
  container.id = "dtools-container-local";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.right = "10px";
  container.style.width = "350px";
  container.style.height = "500px";
  container.style.backgroundColor = "white";
  container.style.boxShadow = "#000000 0px 0px 10px";
  container.style.borderRadius = "10px 10px 0px 0px";
  container.style.zIndex = "999999";
  container.style.overflow = "hidden";
  container.appendChild(iframe);
  document.body.appendChild(container);
};

// // Local
// (function () {
//   if (document.getElementById("dtools-container")) return;
//   var container = document.createElement("div");
//   container.id = "dtools-container";
//   container.style.position = "fixed";
//   container.style.bottom = "0";
//   container.style.right = "10px";
//   container.style.width = "350px";
//   container.style.height = "500px";
//   container.style.backgroundColor = "white";
//   container.style.boxShadow = "#000000 0px 0px 10px";
//   container.style.borderRadius = "10px 10px 0px 0px";
//   container.style.zIndex = "999999";
//   container.style.overflow = "hidden";
//   document.body.appendChild(container);

//   (function () {
//     const appSrc = "http://localhost:8888/dtools-react";
//     const cacheBuster = new Date().getTime();

//     fetch(`${appSrc}/asset-manifest.json?t=${cacheBuster}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((manifest) => {
//         const scriptHash = manifest.files["main.js"];
//         const cssHash = manifest.files["main.css"];

//         console.log({ scriptHash, cssHash });

//         if (cssHash) {
//           const link = document.createElement("link");
//           link.rel = "stylesheet";
//           link.href = cssHash;
//           document.head.appendChild(link);
//         } else {
//           console.error("main.css file not found in asset-manifest.json");
//         }

//         if (scriptHash) {
//           const reactAppDiv = document.createElement("div");
//           reactAppDiv.id = "react-app-root";
//           document.getElementById("dtools-container").innerHTML = "";
//           document.getElementById("dtools-container").append(reactAppDiv);

//           const script = document.createElement("script");
//           script.src = scriptHash;

//           document.head.appendChild(script);
//         } else {
//           console.error("main.js file not found in asset-manifest.json");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching manifest:", error);
//       });
//   })();
// })();
