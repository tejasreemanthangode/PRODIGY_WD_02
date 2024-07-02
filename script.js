// script.js
let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;

document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('pause-btn').addEventListener('click', pauseStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);
document.getElementById('lap-btn').addEventListener('click', lapStopwatch);

function startStopwatch() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTime, 1000);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('lap-btn').disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function resetStopwatch() {
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    document.getElementById('time-display').innerText = '00:00:00';
    document.getElementById('lap-list').innerHTML = '';
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('lap-btn').disabled = true;
}

function lapStopwatch() {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapList = document.getElementById('lap-list');
    const lapListItem = document.createElement('li');
    lapListItem.innerText = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapListItem);
}

function updateTime() {
    currentTime = new Date().getTime() - startTime;
    document.getElementById('time-display').innerText = formatTime(currentTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}