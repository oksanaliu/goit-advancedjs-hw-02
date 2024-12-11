import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#start-btn');
const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

let timerId = null;
let selectedDate = null;

// Flatpickr initialization
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};
flatpickr(datePicker, options);

// Countdown logic
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeDiff = selectedDate - now;

    if (timeDiff <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: 'Finished',
        message: 'Countdown completed!',
        position: 'topRight',
      });
      resetTimer();
      return;
    }

    updateTimer(convertMs(timeDiff));
  }, 1000);
});

// Update timer display
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Convert milliseconds to time
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Add leading zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Reset timer
function resetTimer() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
  datePicker.disabled = false;
}
