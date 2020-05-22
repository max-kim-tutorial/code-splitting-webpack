const clickEvent = () => {
  const app = document.querySelector(".app");
  app.innerText = "Click 되었습니다";
  const button = document.querySelector(".btn");
  button.remove();
};

export default clickEvent;
