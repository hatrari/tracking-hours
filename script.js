function renderHourDigit(hour) {
  return `0${hour}`.slice(-2);
}

function renderHourTemplate(hour) {
  return `
    <div class="hour">
      <div class="hour-label">${renderHourDigit(hour)}</div>
      <div class="hour-box"></div>
      <div class="hour-box"></div>
      <div class="hour-box"></div>
      <div class="hour-box"></div>
      <div class="hour-box"></div>
      <div class="hour-box"></div>
    </div>
  `;
}

let hoursContainer = document.getElementById('hours-container');

for(let i=0; i<24; i++) {
  hoursContainer.innerHTML += renderHourTemplate(i);
}

function switchColor(div) {
  let background = div.style.background;
  if(background === 'white' || background === '') {
    background = 'grey'
  } else {
    background = 'white'
  }
  div.style.background = background;
}

function addClickEventToHourBox() {
  let divs = document.querySelectorAll('.hour-box');
  divs.forEach(
    item => 
    item.addEventListener('click', () => switchColor(item))
  );
}

document.addEventListener('DOMContentLoaded', addClickEventToHourBox);

function formatDate(date) {
  let year = date.getFullYear();
  let month = parseInt(date.getMonth()) + 1;
  let day = date.getDate();
  return `${day}/${month}/${year}`;
}

function parseDate(date) {
  let dateArray = date.split('/');
  return {day: dateArray[0], month: dateArray[1], year: dateArray[2]};
}

function addOneDay(date) {
  let dateJson = parseDate(date);
  let newDate = new Date(`${dateJson.year}-${dateJson.month}-${dateJson.day}`);
  let day = newDate.getDate();
  newDate.setDate(day + 1);
  return newDate;
}

function substractOneDay(date) {
  let dateJson = parseDate(date);
  let newDate = new Date(`${dateJson.year}-${dateJson.month}-${dateJson.day}`);
  let day = newDate.getDate();
  newDate.setDate(day - 1);
  return newDate;
}

document.getElementById('date-container').innerHTML = `
  <button id="substract-one-day">-</button>
  <span id="current-date">${formatDate(new Date())}</span> 
  <button id="add-one-day">+</button>
`;

document.getElementById('add-one-day').addEventListener('click', function() {
  let currentDate = document.getElementById('current-date');
  let newDate = addOneDay(currentDate.innerText);
  currentDate.innerText = formatDate(newDate);
});

document.getElementById('substract-one-day').addEventListener('click', function() {
  let currentDate = document.getElementById('current-date');
  let newDate = substractOneDay(currentDate.innerText);
  currentDate.innerText = formatDate(newDate);
});