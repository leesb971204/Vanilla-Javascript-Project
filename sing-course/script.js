const input = document.querySelector(".sing_input");
const skip = document.querySelector(".button_Skip");
const start = document.querySelector(".button_Start");
const player = document.querySelector(".sing_player");
const enter = document.querySelector(".button_Enter");
const score = document.querySelector(".sing_score");
const timer = document.querySelector(".timer");
skip.addEventListener("click", skipSing);
start.addEventListener("click", startGame);
enter.addEventListener("click", answer);

let scores = 0;
skip.style.display = "none";
let startTime = 40;

var problems = {
  sing1: {
    sing_name: "헤어진우리가지켜야할것들",
    sing_time: 120,
  },
  sing2: {
    sing_name: "사실나는",
    sing_time: 355,
  },
};

const arr = [120];
for (let a = 1; a < 12; a++) {
  arr[a] = arr[0] + 235 * a;
}
let i;
let tmp;
function showScore() {
  score.innerText = "현재 점수 : " + scores;
}
function getUrl() {
  i = Math.floor(Math.random() * arr.length);
  let url =
    "https://www.youtube.com/embed/YuvEewomXcY?start=" +
    arr[i] +
    "&end=" +
    (arr[i] + 40) +
    "&autoplay=1";
  return url;
}
function deleteMusic() {
  tmp = arr[i];
  arr.splice(arr.indexOf(arr[i]), 1);
}

function tt() {
  var setTimer = setInterval(function setTimer() {
    timer.innerHTML = startTime + "초";
    startTime -= 1;
    if (startTime < 0) {
      clearInterval(setTimer);
      timer.innerHTML = "0초";
    }
  }, 1000);
}

function startGame(event) {
  showScore();
  skip.style.display = "flex";
  tt();
  event.preventDefault();
  start.remove();
  player.setAttribute("src", getUrl());
  timer.style.display = "flex";
  deleteMusic();
}

function skipSing(event) {
  refresh();
  event.preventDefault();
  if (arr.length > 0) {
    player.setAttribute("src", getUrl());
  }
  input.value = " ";
  deleteMusic();
}
function answer(event) {
  event.preventDefault();
  if (
    tmp === problems.sing1.sing_time &&
    input.value === problems.sing1.sing_name
  ) {
    correctAnswer();
  }
}

function correctAnswer() {
  timer.innerText = "정답입니다!";
  clearTimeout(setTimer);
  skip.innerText = "다음곡";
  scores++;
}

function refresh() {
  startTime = 40;
  skip.innerText = "Skip";
}
