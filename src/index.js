import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mountNode =
  document.getElementById("react-app-root") || document.createElement("div");
if (!document.getElementById("react-app-root")) {
  mountNode.id = "react-app-root";
  document.body.appendChild(mountNode);
}

ReactDOM.render(<App />, mountNode);
