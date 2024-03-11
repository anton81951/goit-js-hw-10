import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector("[data-start]");
const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
};

let countdownInterval;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future and reload the page',
        position: 'topCenter'
      });
      picker.clear();
      button.disabled = true;
    } else {
      picker.close();
      button.disabled = false;
    }
  },
};

const picker = flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountdown() {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = selectedDate.getTime() - now;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      button.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerFields.days.textContent = formatTimeValue(days);
  timerFields.hours.textContent = formatTimeValue(hours);
  timerFields.minutes.textContent = formatTimeValue(minutes);
  timerFields.seconds.textContent = formatTimeValue(seconds);
}

function formatTimeValue(value) {
  return value < 10 ? `0${value}` : value;
}

button.addEventListener("click", function () {
  if (!selectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date',
      position: 'topCenter'
    });
    return;
  }

  startCountdown();
});
