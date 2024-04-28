import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
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
            iziToast.show({
                message: 'Please choose a date in the future',
                backgroundColor: '#EF4040',
                borderBottom: '2px solid #FFBEBE',
                borderRadius: '4px',
                padding: '20px',
                messageColor: '#FFF'
            });
            return;
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

function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
};

function startTimer(userSelectedDate) {
    const countdownInterval = setInterval(() => {
        const timeRemaining = userSelectedDate - Date.now();

        if (timeRemaining > 0) {
            updateTimer(timeRemaining);
        } else {
            clearInterval(countdownInterval);
            updateTimer(0);
            datePicker.disabled = false;
            button.disabled = false;
        }
    }, 1000);
};

button.addEventListener('click', () => {

    if (startTimer) {
        datePicker.disabled = true;
        button.disabled = true;
        startTimer(userSelectedDate);
    }
});