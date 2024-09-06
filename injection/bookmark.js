(function () {
  const script = document.createElement("script");
  script.src =
    "https://prince-deriv.github.io/dtools-react/injection/production.js";
  script.type = "module";
  document.head.appendChild(script);
})();

(function () {
  const script = document.createElement("script");
  const timestamp = new Date().getTime();
  script.src =
    "http://localhost:8888/dtools-react/injection/local.js?cache-buster=" +
    timestamp;
  script.type = "text/javascript";
  script.onload = function () {
    console.log("Script loaded successfully!");
  };
  script.onerror = function () {
    console.error("Error loading script.");
  };
  document.head.appendChild(script);
})();
