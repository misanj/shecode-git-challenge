let dateElement = document.querySelector("#current-date");
let currentDateTime = new Date();
currentDateTime.toLocaleString([], {
  hour12: false
});
dateElement.innerHTML = formatDate(currentDateTime);

function formatDate(currentDateTime) {
  let hours = currentDateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDateTime.getMinutes();
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
    "Saturday"
  ];

  return `${days[currentDateTime.getDay()]}, ${hours} : ${minutes}`;
}

function submitSearchrequest(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  searchCity(cityName);
}

function cityWeatherDetails(response) {
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = response.data.name;
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = response.data.main.humidity;

  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = Math.round(response.data.wind.speed);

  let cityWeatherDes = document.querySelector("#description");
  cityWeatherDes.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityWeatherDetails);
}

function searchCurrentLocation(position) {
  let key = "8aaf43336ea4d00947056099b9a64212";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(cityWeatherDetails);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", showLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearchrequest);

searchCity("Oslo");
