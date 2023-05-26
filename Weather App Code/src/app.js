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
  cityElement.innerHTML = apiResponse.data.city;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(apiResponse.data.temperature.current);
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = apiResponse.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = apiResponse.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(apiResponse.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(apiResponse.data.time * 1000);
}
let apiKey = "78af09ec4f1b3eda1a73782o76t19456";
let city = "Sydney";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric;`;
console.log(apiUrl);
axios.get(apiUrl).then(showTemperature);
