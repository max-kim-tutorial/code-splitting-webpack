// 진입점
const init = () => {
  const button = document.querySelector(".btn");
  import(/* webpackChunkName: "click" */ "./clickEvent").then((click) => {
    button.addEventListener("click", click.default);
  });
};

init();
