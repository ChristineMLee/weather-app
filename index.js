let currentTime = new Date();
console.log(new Date());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let currentDate = currentTime.getDate();
let currentMonth = months[currentTime.getMonth()];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
{
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
}
let currentMinutes = currentTime.getMinutes();
{
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay}, ${currentMonth} ${currentDate},  ${currentHour}:${currentMinutes}`;



//Homework Week 5//

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°`;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${wind} mph`;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = `${description}`;


  let citiesInput = document.querySelector("#current-city");
  citiesInput.innerHTML = response.data.name;

  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.weather[0].description);
}

function currrentCityLocation(city) {
  let apiKey = "566f2fbb928b35d0ef94313252c6586b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}



function searchForm(event) {
  event.preventDefault();
  
  let searchInput = document.querySelector("#search-city-input");
  let citiesInput = document.querySelector("#current-city");
  citiesInput.innerHTML = searchInput.value;

  currrentCityLocation(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);



function currentGeoLocation(postion) {
  let lat = postion.coords.latitude;
  let long = postion.coords.longitude;
  let units = "imperial";
  let apiKey = "566f2fbb928b35d0ef94313252c6586b";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  console.log(postion);
  console.log(postion.coords.latitude);
  console.log(postion.coords.longitude);
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}

let geoLocationButton = document.querySelector("#geolocation-button");
geoLocationButton.addEventListener("click", currentLocation);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentGeoLocation);
}

currrentCityLocation("Tampa");
console.log("currentCityLocaion");