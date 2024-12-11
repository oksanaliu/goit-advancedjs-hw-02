import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startButton: document.querySelector('#start-btn'),
  datePicker: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = null;

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    if (chosenDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        timeout: 3000,
      });
      refs.startButton.disabled = true;
      return;
    }
    selectedDate = chosenDate;
    refs.startButton.disabled = false;
  },
};

flatpickr(refs.datePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

function updateTimerUI({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function startTimer() {
  if (!selectedDate) return;

  refs.startButton.disabled = true;
  refs.datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeLeft = selectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: 'Timer finished',
        message: 'The countdown has ended!',
        position: 'topRight',
        timeout: 3000,
      });
      refs.startButton.disabled = false;
      refs.datePicker.disabled = false;
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(timeLeft);
    updateTimerUI(time);
  }, 1000);
}

refs.startButton.addEventListener('click', startTimer);
