function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  {
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
}

function getForecast(coordinates) {
  let apiKey = "78af09ec4f1b3eda1a73782o76t19456";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function showTemperature(apiResponse) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  celciusTemperature = apiResponse.data.temperature.current;
  cityElement.innerHTML = apiResponse.data.city;
  tempElement.innerHTML = Math.round(apiResponse.data.temperature.current);
  conditionElement.innerHTML = apiResponse.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${apiResponse.data.condition.icon}.png`
  );
  humidity.innerHTML = apiResponse.data.temperature.humidity;
  wind.innerHTML = Math.round(apiResponse.data.wind.speed);
  date.innerHTML = formatDate(apiResponse.data.time * 1000);
  getForecast(apiResponse.data.coordinates);
}

function displayFahTemp(event) {
  event.preventDefault();
  let fahrenheitEquation = (celciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitEquation);
}
function displayCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celciusEquation = celciusTemperature;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusEquation);
}

function search(city) {
  let apiKey = "78af09ec4f1b3eda1a73782o76t19456";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric;`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
                    <div class="forecast-weekday">${formatForecastDay(
                      forecastDay.time
                    )}</div>
                
                    <div class="forecastIcon">
                        <img
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                          forecastDay.condition.icon
                        }.png"
                        alt="Broken Clouds"
                        id="forecastIcon-monday"
                        class="forecastWeatherIcon"
                        width ="82px"
                        />
                    </div>
                    <div class="forecastTemperatures">
                        <span class="forecast-temperature-max">${Math.round(
                          forecastDay.temperature.maximum
                        )}°C <b>|</b></span>
                        <span class="forecast-temperature-min">${Math.round(
                          forecastDay.temperature.minimum
                        )}°C</span>
                    </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCurrentPosition(coordinates) {
  let apiKey = "78af09ec4f1b3eda1a73782o76t19456";
  let longitude = coordinates.coords.longitude;
  let latitude = coordinates.coords.latitude;
  let apiURL = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let button = document.querySelector("#locationButton ");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#unitLink");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", displayCelciusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusTemperature = null;
search("perth");
