/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '53ac9defac0fcd86acb49eb12a84f2e1&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', createWeather);

/* Function called by event listener */
function createWeather() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then(function(data) {
        postData('/add', {date: newDate, temp: data.main.temp, content: feelings});
    })
    .then(function() {
        updateUI();
    })
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apikey) => {
    const res = await fetch(baseURL+zip+'&appid='+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) { 
        console.log('error', error)
    }
};

/* Function to POST Data */
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(allData.temp) + '°C';
        document.getElementById('content').innerHTML = 'I\'m Feeling: ' + allData.content;
    } catch(error) {
        console.log('error', error);
    }
};