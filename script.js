document.addEventListener('DOMContentLoaded', init);
const URL_BACKEND = 'http://localhost:3000/';

function init() {
  document.getElementById('current-date').innerHTML = formatDate(new Date());

  document.getElementById('add-one-day').addEventListener('click', function() {
    let currentDate = document.getElementById('current-date');
    let newDate = addOneDay(currentDate.innerText);
    currentDate.innerText = formatDate(newDate);
    getData();
  });

  document.getElementById('substract-one-day').addEventListener('click', substractClickHandler);

  let hoursContainer = document.getElementById('hours-container');

  for(let i=0; i<24; i++) {
    hoursContainer.innerHTML += renderHourTemplate(i);
  }

  getData();

  addClickEventToHourBox();
}

function substractClickHandler() {
  let currentDate = document.getElementById('current-date');
  let newDate = substractOneDay(currentDate.innerText);
  currentDate.innerText = formatDate(newDate);
  getData();
}

function formatDate(date) {
  let year = date.getFullYear();
  let month = parseInt(date.getMonth()) + 1;
  let day = date.getDate();
  return `${day}/${month}/${year}`;
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

function parseDate(date) {
  let dateArray = date.split('/');
  return {day: dateArray[0], month: dateArray[1], year: dateArray[2]};
}

function renderHourTemplate(hour) {
  let twoDigitHour = renderHourDigit(hour);
  return `
    <div class="hour">
      <div class="hour-label">${twoDigitHour}</div>
      <div id="0-${twoDigitHour}" class="hour-box"></div>
      <div id="1-${twoDigitHour}" class="hour-box"></div>
      <div id="2-${twoDigitHour}" class="hour-box"></div>
      <div id="3-${twoDigitHour}" class="hour-box"></div>
      <div id="4-${twoDigitHour}" class="hour-box"></div>
      <div id="5-${twoDigitHour}" class="hour-box"></div>
    </div>
  `;
}

function renderHourDigit(hour) {
  return `0${hour}`.slice(-2);
}

function getCurrentDateBackendFormat() {
  let currentDate = document.getElementById('current-date').innerText;
  return currentDate.replace('/', '-').replace('/', '-');
}

function getData() {
  InitHourBoxesColor();
  let urlBackEnd = URL_BACKEND + getCurrentDateBackendFormat();
  fetch(urlBackEnd)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let id = `${item.block}-${item.hour}`;
      if  (item.date === getCurrentDateBackendFormat()) {
        document.getElementById(id).style.background = item.color;
      } else {
        document.getElementById(id).style.background = 'white';
      }
    });
  });
}

function addClickEventToHourBox() {
  let divs = document.querySelectorAll('.hour-box');
  divs.forEach(
    item => 
    item.addEventListener('click', () => hourBoxClickHandler(item))
  );
}

function InitHourBoxesColor() {
  let divs = document.querySelectorAll('.hour-box');
  divs.forEach(
    item => 
    item.style.background = 'white'
  );
}

function hourBoxClickHandler(div) {
  switchColor(div);
  let hourBoxData = {
    hour: div.id.split('-')[1],
    block: div.id.split('-')[0],
    color: div.style.background,
    date: getCurrentDateBackendFormat()
  };
  setData(hourBoxData);
}

function switchColor(div) {
  let background = div.style.background;
  if(background === 'white' || background === '') {
    background = 'grey'
  } else if (background === 'grey') {
    background = 'silver';
  } else {
    background = 'white';
  }
  div.style.background = background;
}

function setData(hourBoxData) {
  fetch(URL_BACKEND, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(hourBoxData)
  });
}