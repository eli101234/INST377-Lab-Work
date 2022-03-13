function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

function dataHandler(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray);
  const range = [...Array(15).keys()];
  range.forEach((item) => {
    console.log('rangeitem', item);
  });
}
async function mainEvent() {
  console.log('script loaded');
  const form = document.querySelector('.left-box');
  const submit = document.querySelector('.submit-button');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG');
  const arrayFromJson = await results.json();
  if (arrayFromJson.data.length > 0) {
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('form submission');
      button.style.disply = 'block';
    });
  }
  dataHandler(console.table(arrayFromJson));
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
