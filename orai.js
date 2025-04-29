const apiKey = '6f803d807ed644b1a6f170640252804';
const forecastUrl = 'http://api.weatherapi.com/v1/forecast.json';

document.addEventListener('DOMContentLoaded', () => {
    getForecast('Vilnius');

    const form = document.getElementById('city-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            getForecast(city);
        }
    });
});

async function getForecast(city) {
    try {
        const response = await fetch(`${forecastUrl}?key=${apiKey}&q=${city}&days=7&lang=lt`);
        const data = await response.json();

        updateCurrentWeather(data);
        updateForecast(data.forecast.forecastday);
    } catch (error) {
        console.error('Klaida gaunant prognozę:', error);
    }
}

function updateCurrentWeather(data) {
    document.querySelector('.place-date p:nth-child(1)').textContent = `${data.location.name}, ${data.location.region}`;

    const now = new Date(data.location.localtime);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.querySelector('.place-date p:nth-child(2)').innerHTML =
        now.toLocaleDateString('lt-LT', options) + `<br>${data.current.condition.text}`;

    document.querySelector('.box-left div:nth-child(2)').textContent = Math.round(data.current.temp_c);
    document.querySelector('.box-left div:nth-child(3)').textContent = '°C';
    document.querySelector('.box-left img').src = `https:${data.current.condition.icon}`;

    const boxRight = document.querySelector('.box-right');
    boxRight.innerHTML = `
        <p>Krituliai: ${data.current.precip_mm} mm</p>
        <p>Drėgmė: ${data.current.humidity}%</p>
        <p>Vėjas: ${data.current.wind_kph} km/h ${data.current.wind_dir}</p>
        <p>Žiedadulkių kiekis: 36</p>
    `;
}

function updateForecast(forecastData) {
    const forecastsContainer = document.querySelector('.forecasts');
    forecastsContainer.innerHTML = '';

    forecastData.forEach(day => {
        const date = new Date(day.date);
        const weekday = date.toLocaleDateString('lt-LT', { weekday: 'long' });

        const html = `
            <div class="forecast-day">
                <p>${capitalize(weekday)}</p>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                <div class="high-temp">${Math.round(day.day.maxtemp_c)}°
                    <div class="low-temp">${Math.round(day.day.mintemp_c)}°</div>
                </div>
                <div class="low-temp2">${Math.round(day.day.mintemp_c)}°</div>
                <p>Žiedadulkės: 36</p>
            </div>
        `;
        forecastsContainer.innerHTML += html;
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    getForecast('Vilnius');
    const searchButton = document.querySelector('.search-button');
});

