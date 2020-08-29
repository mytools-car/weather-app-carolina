// Initialization with temperature from current position
let apiKey = "01f3fb49b18b138eeaf7378abfb6d3c9";
let currentUnit = null;
getCurrentPosition();

// To get weather forecast from the search bar/form
function handleTemperatureForm(event) {
  event.preventDefault();
  city = document.querySelector("#city-input").value;
  let cityPlaceholder = document.querySelector("#city-placeholder");
  cityPlaceholder.innerHTML = city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getTemp);
}

// To set full date
function setDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayToday = daysOfWeek[day];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${dayToday}, ${setHours(timestamp)}`;
}

// To set only hours
function setHours(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

// To get current temperature and invoke getForecast function
function getTemp(response) {
  let cityPlaceholder = document.querySelector("#city-placeholder");
  city = response.data.name;
  cityPlaceholder.innerHTML = city;

  let tempPlace = document.querySelector("#temperature");
  let temp_round = Math.round(response.data.main.temp);
  tempPlace.innerHTML = `${temp_round}`;
  currentUnit = "celsius";

  let descriptionPlace = document.querySelector("#description-placeholder");
  descriptionPlace.innerHTML = `${response.data.weather[0].description}`;

  let humidityPlace = document.querySelector("#humidity-placeholder");
  humidityPlace.innerHTML = `${response.data.main.humidity}`;

  let windPlace = document.querySelector("#wind-placeholder");
  windPlace.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let datePlaceholder = document.querySelector("#date-placeholder");
  datePlaceholder.innerHTML = setDate(response.data.dt);

  let iconPlaceholder = document.querySelector("#icon-placeholder");
  iconPlaceholder.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(getForecast);
}

// To get weather forecast
function getForecast(response) {
  let forecastPlace = document.querySelector("#forecast-placeholder");
  forecastPlace.innerHTML = null;
  let forecast = null;

  for (let i = 0; i < 6; i++) {
    forecast = response.data.list[i];
    forecastPlace.innerHTML += `<div class="col">
      <h5>${setHours(forecast.dt)}</h5>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" height="40" />
      <div class="weather-forecast-temp">
        <strong>${Math.round(forecast.main.temp_max)}</strong> ${Math.round(
      forecast.main.temp_min
    )}°C
      </div>
  </div>`;
  }
}

// To get current coordinates
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// To get weather forecast from current position (coordinates)
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getTemp);
}

// Go button event listener
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleTemperatureForm);

// F link event listener
let fahrenLink = document.querySelector("#fahrenheit");
fahrenLink.addEventListener("click", function () {
  if (currentUnit === "celsius") {
    let tempPlace = document.querySelector("#temperature");
    let temp_round = Math.round((tempPlace.innerHTML * 9) / 5 + 32);
    tempPlace.innerHTML = `${temp_round}`;
    currentUnit = "fahrenheit";

    celsiusLink.classList.remove("active");
    fahrenLink.classList.add("active");
  }
});

// C link event listener
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", function () {
  if (currentUnit === "fahrenheit") {
    let tempPlace = document.querySelector("#temperature");

    let temp_round = Math.round((5 / 9) * (tempPlace.innerHTML - 32));
    tempPlace.innerHTML = `${temp_round}`;
    currentUnit = "celsius";

    fahrenLink.classList.remove("active");
    celsiusLink.classList.add("active");
  }
});

// Current button event listener
let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);
