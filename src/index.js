// 진입점
import clickEvent from "./clickEvent";

const init = () => {
  const button = document.querySelector(".btn");
  button.addEventListener("click", clickEvent);
};

init();
