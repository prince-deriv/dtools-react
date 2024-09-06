import { CONSTANTS, getContainer } from "./controller.js";

const loadDToolsLocal = () => {
  if (document.getElementById("dtools-container-local")) return;
  const container = getContainer("dtools-container-local");
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:8888/dtools-react";
  iframe.width = `${CONSTANTS.FRAME_WIDTH}px`;
  iframe.height = `${CONSTANTS.FRAME_HEIGHT}px`;
  iframe.style.border = "0";
  iframe.style.backgroundColor = "transparent";
  container.appendChild(iframe);
  document.body.appendChild(container);
};

loadDToolsLocal();
