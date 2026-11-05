const STORAGE_KEY = 'pomodoro.minutes';
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const form = document.getElementById('setting-form');
const input = document.getElementById('timer-minutes');
const saveBtn = document.getElementById('save-btn');
const backBtn = document.getElementById('back-btn');
const hint = document.getElementById('hint');

function loadMinutes() {
  const n = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isInteger(n) && n >= MIN_MINUTES && n <= MAX_MINUTES ? n : DEFAULT_MINUTES;
}

function isValid(value) {
  if (value.trim() === '') return false;
  const n = Number(value);
  return Number.isInteger(n) && n >= MIN_MINUTES && n <= MAX_MINUTES;
}

function validate() {
  const value = input.value;
  const ok = isValid(value);
  saveBtn.disabled = !ok;
  const showError = value.trim() !== '' && !ok;
  hint.classList.toggle('error', showError);
  hint.textContent = showError
    ? `${MIN_MINUTES}~${MAX_MINUTES} 사이의 정수만 입력할 수 있어요.`
    : `${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 입력하세요.`;
}

input.value = loadMinutes();
validate();
input.addEventListener('input', validate);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!isValid(input.value)) return;
  localStorage.setItem(STORAGE_KEY, String(Number(input.value)));
  location.href = 'index.html';
});

backBtn.onclick = () => {
  location.href = 'index.html';
};
