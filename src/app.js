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
var h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours()}:${mins()}`;

function displayWeatherCondition(response) {
  console.log(response);
  // make changes to the HTML
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search input").value;
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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York");
