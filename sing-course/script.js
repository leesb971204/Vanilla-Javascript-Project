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

var scores = 0;
skip.style.display = "none";
let startTime = 40;

var sing_timer;

function showScore() {
  score.innerText = "현재 점수 : " + scores;
}
//점수표시
function setTimer() {
  timer.innerHTML = startTime + "초";
  startTime -= 1;
  if (startTime < 0) {
    clearInterval(startTime);
    timer.innerText = "0초";
    timer.innerText = "시간초과!";
    enter.disabled = true;
  }
}
function startTimer() {
  startTime = 40;
  sing_timer = setInterval(setTimer, 1000);
}
function restartTimer() {
  startTime = 40;
  clearInterval(sing_timer);
  sing_timer = setInterval(setTimer, 1000);
}

//타이머부분
const arr = [120];
for (let a = 1; a < 12; a++) {
  arr[a] = arr[0] + 235 * a;
}

var problems = [
  { sing_name: "헤어진우리가지켜야할것들", sing_time: arr[0] },
  { sing_name: "사실나는", sing_time: arr[1] },
  { sing_name: "끝난사이", sing_time: arr[2] },
  { sing_name: "우리왜헤어져야해", sing_time: arr[3] },
  { sing_name: "반만", sing_time: arr[4] },
  { sing_name: "미친소리", sing_time: arr[5] },
  { sing_name: "내마음이움찔했던순간", sing_time: arr[6] },
  { sing_name: "서툰이별을하려해", sing_time: arr[7] },
  { sing_name: "거짓말이라도해서널보고싶어", sing_time: arr[8] },
  { sing_name: "사랑은지날수록더욱선명하게남아", sing_time: arr[9] },
  { sing_name: "넌나의전부", sing_time: arr[10] },
  { sing_name: "광안대교", sing_time: arr[11] },
];

//노래목록
let i;
let tmp;

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
//난수를 생성해 url로 문제를 생성하는 함수

function deleteMusic() {
  tmp = arr[i];
  arr.splice(arr.indexOf(arr[i]), 1);
}
//정답이거나 스킵시에 사용되는 문제 삭제 함수
function startGame(event) {
  showScore();
  startTimer();
  skip.style.display = "flex";
  enter.disabled = false;
  event.preventDefault();
  start.remove();
  player.setAttribute("src", getUrl());
  timer.style.display = "flex";
  deleteMusic();
}
//게임시작 함수
function skipSing(event) {
  restartTimer();
  skip.innerText = "Skip";
  enter.disabled = false;
  event.preventDefault();
  if (arr.length > 0) {
    player.setAttribute("src", getUrl());
  }
  input.value = " ";
  deleteMusic();
}
//문제 스킵 함수
function answer(event) {
  var index1 = problems.findIndex((obj) => obj.sing_time == tmp);
  event.preventDefault();
  if (
    tmp === problems[index1].sing_time &&
    input.value === problems[index1].sing_name
  ) {
    correctAnswer();
    scores++;
    showScore();
  } else wrongAnswer();
}
//정오판별 함수
function correctAnswer() {
  timer.innerHTML = "<h2>정답입니다!</h2>";
  skip.innerText = "다음곡";
  enter.disabled = true;
  clearInterval(sing_timer);
}
function wrongAnswer() {
  timer.innerHTML = "<h2>오답입니다!</h2>";
}
