let now = new Date();
let todaysDate = document.querySelector("h2#currentDateTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
currentMinutes = currentMinutes > 9 ? currentMinutes : "0" + currentMinutes;
todaysDate.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

//Show searched location//

function showTemp(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#change-city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}`;

  // To change humidity, wind, and weather//

  let humidity = response.data.main.humidity;
  console.log(response.data.main);
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
  let apiKey = "374252187c262a7fb1ad4bdc00cf1626";
  let appUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

  axios.get(appUrl).then(showTemp);
}
let newCity = document.querySelector("#submit");
newCity.addEventListener("click", showCity);

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

//Show current location//

function showCurrentLocationTemp(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#change-city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${temperature}`;
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "374252187c262a7fb1ad4bdc00cf1626";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCurrentLocationTemp);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);
