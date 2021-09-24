const skip = document.querySelector(".button_Skip");
const start = document.querySelector(".button_Start");
const player = document.querySelector(".sing_player");
const enter = document.querySelector(".button_Enter");

skip.addEventListener("click", setP);
start.addEventListener("click", startGame);

function getUrl() {
  let i = Math.floor(Math.random() * 2820);
  let url =
    "https://www.youtube.com/embed/YuvEewomXcY?start=" +
    i +
    "&end=" +
    (i + 40) +
    "&autoplay=1";
  return url;
}
function startGame(event) {
  event.preventDefault();
  start.remove();
  player.setAttribute("src", getUrl());
}
function setP(event) {
  event.preventDefault();
  player.setAttribute("src", getUrl());
}
