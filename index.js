function loadInitialSeconds() {
  const n = Number(localStorage.getItem('pomodoro.minutes'));
  const minutes = Number.isInteger(n) && n >= 1 && n <= 60 ? n : 25;
  return minutes * 60;
}

const INITIAL_SECONDS = loadInitialSeconds();

const timeEl = document.querySelector('.time');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');

let remaining = INITIAL_SECONDS;
let intervalId = null;

function render() {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  timeEl.textContent = `${m}:${s}`;
}

function startTimer() {
  if (intervalId !== null || remaining <= 0) return;
  intervalId = setInterval(() => {
    remaining -= 1;
    render();
    if (remaining <= 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = INITIAL_SECONDS;
  render();
}

const settingsBtn = document.querySelector('.btn-settings');

settingsBtn.onclick = () => {
  location.href = 'setting.html';
};

render();

startBtn.onclick = startTimer;
pauseBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;
