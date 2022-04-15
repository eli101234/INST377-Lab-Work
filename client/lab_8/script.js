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
function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}

async function mainEvent() {
  const form = document.querySelector('.left-box');
  const submit = document.querySelector('.submit-button');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap();
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
