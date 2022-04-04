function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

function restoArrayMake(dataArray) {
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
}

function createHtmlList(collection) {
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() {
  const form = document.querySelector('.left-box');
  const submit = document.querySelector('.submit-button');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();
  if (arrayFromJson.length > 0) { // Helps make sure we do not a race condition on data load
    submit.style.display = 'block';
    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      if (currentArray.length < 1) {
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      createHtmlList(selectResto);
    });
    zipcode.addEventListener('input', async (event) => {
      if (currentArray.length < 1) {
        return;
      }
      selectResto = currentArray.filter((item) => item.zip.includes(event.target.value));
      createHtmlList(selectResto);
    });
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = restoArrayMake(arrayFromJson);
      createHtmlList(currentArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
