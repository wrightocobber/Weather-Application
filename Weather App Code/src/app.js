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
function showTemperature(apiResponse) {
  console.log(apiResponse);
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

let fahrenheitLink = document.querySelector("#unitLink");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", displayCelciusTemp);

let apiKey = "78af09ec4f1b3eda1a73782o76t19456";
let city = "Sydney";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric;`;
axios.get(apiUrl).then(showTemperature);
let celciusTemperature = null;
