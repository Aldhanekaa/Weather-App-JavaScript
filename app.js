const APIKEY = 'e8b1e741b9c185721c0ef66adcac5948';
const KELVIN = 273.15;
const weather = {};
weather.temperature = {
    unit: "celsius"
}
const notification = document.querySelector('.notification');
const weatherIcon = document.querySelector('.weather-icon');
const tD = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location');
const temperature = document.querySelector('.temperature-value');

// ============================================================================================
// Requesting User's Position =================================================================
// ============================================================================================
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(Position, getError);
} else {
    notification.style.display = 'block';
    notification.innerHTML = `<p>${e.message}</p>`
}
// ============================================================================================
// Requesting User's Position =================================================================
// ============================================================================================



// ============================================================================================
// getPosition and getError when requesting user's position ===================================
// ============================================================================================
function Position(p) {
    const { coords: { latitude, longitude } } = p;
    weather.currentPosition = {
        latitude,
        longitude
    }
    getAPI()
    console.log(weather);
    console.log(latitude);
}
function getError(e) {
    notification.style.display = 'block';
    notification.innerHTML = `<p>${e.message}</p>`
}
// ============================================================================================
// getPosition and getError when requesting user's position ===================================
// ============================================================================================





// ============================================================================================
// print out all in api to user  ==============================================================
// ============================================================================================

function getAPI() {
    const { currentPosition: { latitude, longitude } } = weather;
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
    fetch(api)
        .then(response => response.json())
        .then(response => {
            getData(response)
        })
}

function getData(response) {
    const { main, name, sys: { country }, weather: w } = response;
    console.log(response);

    weather.temperature.value = Math.floor(main.temp - KELVIN);
    weather.description = w[0].description;
    weather.iconId = w[0].icon;
    weather.city = name;
    weather.country = country;
    console.log(weather);

    printOutput(weather);
}

// ============================================================================================
// print out all in api to user  ==============================================================
// ============================================================================================

function printOutput({ temperature: t, city, iconId, country, description }) {
    //some code
    weatherIcon.innerHTML = `
    <img src="icons/${iconId}.png" alt="">
    `;
    temperature.innerHTML = `
    <p>${t.value}°<span>C</span></p>
    `;
    tD.innerHTML = `
    <p>${description}</p>
    `
    locationElement.innerHTML = `
    <p>${city}, ${country}</p>
    `
}

// temperature onclick change to fahrenheit or celsius
temperature.addEventListener('click', function () {
    const { temperature: t } = weather;
    if (t.value == undefined) return;
    if (t.unit == 'celsius') {
        const fahrenheit = Math.floor((t.value * 9 / 5) + 32);
        t.unit = 'fahrenheit';
        temperature.innerHTML = `
        <p>${fahrenheit}°<span>F</span></p>
        `
    } else if (t.unit == 'fahrenheit') {
        t.unit = 'celsius';
        temperature.innerHTML = `
        <p>${t.value}°<span>F</span></p>
        `
    }
    console.log('me!')
})