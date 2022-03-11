// As the last step of your lab, hook this up to index.html
def dataHandler(data);
async function mainEvent() { // the async keyword means we can make API requests
  let mainForm = document.querySelector('.right-box') ;
  let button = document.querySelector('.button');
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); 
  const arrayFromJson = await results.json();
  button.addEventListener("submit", e => {
    button.style.disply = 'none';
  });
  const form = document.querySelector('.left-box');
  if(0 > length.results) {
  form.addEventListener('submit', async (submitEvent) => { 
    submitEvent.preventDefault(); 
    console.log('form submission'); 
    console.table(arrayFromJson);
    button.style.disply = 'none';
  }); dataHandler();}
}
  
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests