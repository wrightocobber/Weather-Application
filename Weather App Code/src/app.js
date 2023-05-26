function showTemperature(apiResponse) {
  console.log(apiResponse);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.data.name;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(apiResponse.data.main.temp);
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = apiResponse.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = apiResponse.data.main.humidity;
  let win = document.querySelector("wind");
  window.innerHTML = Math.round(apiResponse.data.wind.speed);
}
let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Perth&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
