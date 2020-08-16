let apiKey = "01f3fb49b18b138eeaf7378abfb6d3c9";
let currentUnit = "celsius";
let city = "Dublin";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(url).then(getTemp);

function handleTemperatureForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let cityPlaceholder = document.querySelector("#city-placeholder");
  cityPlaceholder.innerHTML = city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getTemp);
}

function getTemp(response) {
  let tempPlace = document.querySelector("#temperature");
  let temp_round = Math.round(response.data.main.temp);
  tempPlace.innerHTML = `${temp_round}`;
  currentUnit = "celsius";
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getTempFromCoordinates);
}

function getTempFromCoordinates(response) {
  let tempPlace = document.querySelector("#temperature");
  let temp_round = Math.round(response.data.main.temp);
  tempPlace.innerHTML = `${temp_round}`;

  let cityPlaceholder = document.querySelector("#city-placeholder");
  cityPlaceholder.innerHTML = response.data.name;
  currentUnit = "celsius";
}

function setDate() {
  let now = new Date();
  let day = now.getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayToday = daysOfWeek[day];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let datePlaceholder = document.querySelector("#date-placeholder");
  datePlaceholder.innerHTML = `${dayToday}, ${hours}:${minutes}`;
}

setDate();
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleTemperatureForm);

let fahrenLink = document.querySelector("#fahrenheit");
fahrenLink.addEventListener("click", function() {
  if (currentUnit === "celsius") {
    let tempPlace = document.querySelector("#temperature");
    console.log(tempPlace.innerHTML);
    let temp_round = Math.round((tempPlace.innerHTML * 9) / 5 + 32);
    tempPlace.innerHTML = `${temp_round}`;
    currentUnit = "fahrenheit";
  }
});

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", function() {
  if (currentUnit === "fahrenheit") {
    let tempPlace = document.querySelector("#temperature");
    console.log(tempPlace.innerHTML);
    let temp_round = Math.round((5 / 9) * (tempPlace.innerHTML - 32));
    tempPlace.innerHTML = `${temp_round}`;
    currentUnit = "celsius";
  }
});

let cityPlaceholder = document.querySelector("#city-placeholder");
cityPlaceholder.innerHTML = city;

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);
