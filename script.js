document.addEventListener('DOMContentLoaded', init);

function init() {
  document.getElementById('current-date').innerHTML = formatDate(new Date());

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

  let hoursContainer = document.getElementById('hours-container');

  for(let i=0; i<24; i++) {
    hoursContainer.innerHTML += renderHourTemplate(i);
  }

  addClickEventToHourBox();
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

function addClickEventToHourBox() {
  let divs = document.querySelectorAll('.hour-box');
  divs.forEach(
    item => 
    item.addEventListener('click', () => hourBoxClickHandler(item))
  );
}

function hourBoxClickHandler(div) {
  switchColor(div);
  let hourBoxData = {
    hour: div.id.split('-')[1],
    block: div.id.split('-')[0],
    color: div.style.background,
    date: document.getElementById('current-date').innerText
  };
  setData(hourBoxData);
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

function setData(hourBoxData) {
  let storage = [];
  if (localStorage.key('data')) {
    let data = localStorage.getItem('data');
    storage = JSON.parse(data);
  }
  let filtredStorage = storage.filter(
    item => !(item.hour === hourBoxData.hour && item.block === hourBoxData.block)
  );
  storage = [...filtredStorage];
  if(hourBoxData.color !== 'white') {
    storage.push(hourBoxData);
  }
  localStorage.setItem('data', JSON.stringify(storage));
  console.log(localStorage.getItem('data'));
}