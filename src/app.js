let now = new Date();
let mins = function () {
  if (now.getMinutes() < 10) {
    return `0${now.getMinutes()}`;
  } else {
    return now.getMinutes();
  }
};
let hours = function () {
  if (now.getHours() < 10) {
    return `0${now.getHours()}`;
  } else {
    return now.getHours();
  }
};

let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
let day = days[now.getDay()];
let h2 = document.querySelector("#date");
h2.innerHTML = `${day} ${hours()}:${mins()}`;

function displayWeatherCondition(response) {
  console.log(response);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  // make changes to the HTML
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

const form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-display");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#farhenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Sydney");
