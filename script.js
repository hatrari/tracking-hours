function renderHourTemplate(hour) {
  return `
    <div class="hour">
      <div>${hour}</div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  `;
}

let container = document.getElementById('container');

for(let i=0; i<24; i++) {
  container.innerHTML += renderHourTemplate(i);
}