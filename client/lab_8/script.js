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
  const latLong = [38.784, -76.872];
  const map = L.map('map').setView(latLong, 13);
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

function addMapMarkers(map, collection) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  collection.forEach((item) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
  });
}

async function mainEvent() {
  const form = document.querySelector('.left-box');
  const submit = document.querySelector('.submit-button');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap();
  const retrievalVar = 'restaurants';
  submit.style.display = 'none';
  if (localStorage.getItem(retrievalVar) === undefined) {
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const arrayFromJson = await results.json();
    localStorage.setItem(retrievalVar, JSON.stringify(arrayFromJson.data));
  }
  const storedDataString = localStorage.getItem(retrievalVar);
  const storedDataArray = JSON.parse(storedDataString);
  console.log(storedDataArray);
  // Helps make sure we do not a race condition on data load
  if (storedDataArray.length > 0) {
    submit.style.display = 'block';
    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      // if (storedDataArray.length < 1) {
      //   return;
      // }
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      createHtmlList(selectResto);
      addMapMarkers(map, selectResto);
    });
    zipcode.addEventListener('input', async (event) => {
      // if (storedDataArray.length < 1) {
      //   return;
      // }
      selectResto = currentArray.filter((item) => item.zip.includes(event.target.value));
      createHtmlList(selectResto);
      addMapMarkers(map, selectResto);
    });
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = restoArrayMake(storedDataArray);
      console.log(currentArray);
      createHtmlList(currentArray);
      addMapMarkers(map, currentArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
