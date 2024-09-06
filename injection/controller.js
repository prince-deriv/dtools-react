export const CONSTANTS = {
  FRAME_WIDTH: 350,
  FRAME_HEIGHT: 500,
};

export const getContainer = (id = "") => {
  const container = document.createElement("div");
  container.id = id;
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.right = "10px";
  container.style.width = `${CONSTANTS.FRAME_WIDTH}px`;
  container.style.height = `${CONSTANTS.FRAME_HEIGHT}px`;
  container.style.backgroundColor = "white";
  container.style.boxShadow = "#000000 0px 0px 10px";
  container.style.borderRadius = "10px 10px 0px 0px";
  container.style.zIndex = "999999";
  container.style.overflow = "hidden";

  return container;
};
