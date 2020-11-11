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

let container = document.getElementById('container');

for(let i=0; i<24; i++) {
  container.innerHTML += renderHourTemplate(i);
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