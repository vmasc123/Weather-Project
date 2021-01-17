let date = new Date();
let currentDate = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[date.getDay()];
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
currentMinutes = currentMinutes > 9 ? currentMinutes : "0" + currentMinutes;
currentDate.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

// Show searched location forecast time //
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Show searched location forecast //

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col" id="#forecast">
              <strong>${formatHours(forecast.dt * 1000)}</strong>
              <br />
              <img
              src ="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"
                />
              <br />
              ${Math.round(forecast.main.temp_max)}°C / <em>${Math.round(forecast.main.temp_min)}°C
              </em> 
           </div>`;
  }
}
//Show searched location temp//

function showTemp(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#change-city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}`;

  // To change main icon //

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  // To change humidity, wind, and weather//

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 8) / 5;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city").value;
  let searchCityLowercase = searchCity.toLowerCase();
  let apiKey = "374252187c262a7fb1ad4bdc00cf1626";
  let appUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityLowercase}&appid=${apiKey}&units=metric`;
  axios.get(appUrl).then(showTemp);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCityLowercase}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
let newCity = document.querySelector("#submit");
newCity.addEventListener("click", showCity);

// Show current location forecast time //

function formatForecastHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Show current location forecast //

function showCurrentLocationForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col" id="#forecast">
              <strong>${formatForecastHours(forecast.dt * 1000)}</strong>
              <br />
              <img
              src ="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"
                />
              <br />
              ${Math.round(forecast.main.temp_max)}°C / <em>${Math.round(forecast.main.temp_min)}°C
    </em> 
    </div>`;
  }
}
//Show current location//

function showCurrentLocationTemp(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#change-city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${temperature}`;

  // To change main icon //

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  // To change humidity, wind, and weather//

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 8) / 5;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
}

function searchLocation(position) {
  let latitude =  position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "374252187c262a7fb1ad4bdc00cf1626";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentLocationTemp);

  let apiUrlCoord = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCoord).then(showCurrentLocationForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);

//Show coversion back to celsius//

function celsiusConversion(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConversion);

//Show conversion to fahrenheit//

function fahrenheitConversion(event) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);
