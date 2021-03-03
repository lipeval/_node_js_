

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'LOADING..'
    messageTwo.textContent = '';
    const location = search.value;
    const url = `/weather?address=${location}`
    
    fetch(url)
    .then(res => res.json())
    .then(res => {
       if(res.error)  {
        messageOne.textContent = res.error;
       } else {
        const [data] = res;
        messageOne.textContent = `Place: ${data.location}`
        messageTwo.textContent = `Forecast: ${data.forecast}`
       }
  

    })
})

