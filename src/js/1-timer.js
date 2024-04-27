import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const button = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const datePicker = document.querySelector('datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let userSelectedDate;
button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        button.disabled = true;
        console.log(selectedDates[0]);
        if (selectedDates[0] >= new Date()) {
            userSelectedDate = selectedDates[0];
            button.disabled = false;
        } else {
            return alert("Please choose a date in the future");
        }
    },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = String(Math.floor(ms / day)).padStart(2, '0');
    const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
    const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
    const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');

    return { days, hours, minutes, seconds };
};

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let countdownInterval;

function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
};

function startTimer(endTime) {
    const endTimeMs = new Date(endTime).Date.now();
    countdownInterval = setInterval(() => {
        const now = new Date().Date.now();
        const timeRemaining = endTimeMs - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            updateTimer(0);
            datePicker.disabled = false;
            button.disabled = false;
        } else {
            updateTimer(timeRemaining);
        }
    }, 1000);
};

button.addEventListener('click', () => {
    const selectedDate = new Date(datePicker.value).Date.now();

    if (!isNaN(selectedDate)) {
        datePicker.disabled = true;
        button.disabled = true;
        startTimer(selectedDate);
    } else {
        alert('Please select a valid date.');
    }
});