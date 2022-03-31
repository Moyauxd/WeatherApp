let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let dayzz = document.querySelector("#date");
dayzz.innerHTML = day;
let timez = document.querySelector("#hour");
let hour = currentDate.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
timez.innerHTML = hour + ":" + minutes;

function searchForm(event) {
  event.preventDefault();
  let apiKey = "8a8ad9029bd968171310f8e561c67847";
  let searchF = document.querySelector("#searching");
  let city = document.querySelector("#city");
  let weatherUrls = `https://api.openweathermap.org/data/2.5/weather?q=${searchF.value}&appid=${apiKey}&units=imperial`;
  city.innerHTML = searchF.value;
  axios.get(weatherUrls).then(displayWeather);
}

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchForm);

function displayWeather(response) {
  let weatherDesription = response.data.weather[0].description;
  let tempNav = Math.round(response.data.main.temp);
  let degreesNav = document.querySelector("#degrees");
  degreesNav.innerHTML = `${tempNav}°F`;
  let weatherDes = document.querySelector(".sunshine");
  weatherDes.innerHTML = weatherDesription;
  let cityz = document.querySelector("#city");
  cityz.innerHTML = response.data.name;
  let humidity = document.querySelector("#humi");
  humidity.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  let windspeds = document.querySelector("#windz");
  windspeds.innerHTML = ` ${Math.round(response.data.wind.speed)} mph`;

  function changeFah(event) {
    event.preventDefault();
    let fahren = document.querySelector("#degrees");
    fahren.innerHTML = `${tempNav}°F`;
  }
  let fahr = document.querySelector("#fah");
  fahr.addEventListener("click", changeFah);

  function changeTemp(event) {
    event.preventDefault();
    let celiusChange = Math.round(((tempNav - 32) * 5) / 9);
    let celciusf = document.querySelector("#degrees");
    celciusf.innerHTML = `${celiusChange}°C`;
  }
  let celc = document.querySelector("#cel");
  celc.addEventListener("click", changeTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPos);
}

let navigatorBtn = document.querySelector("#navig");

navigatorBtn.addEventListener("click", getPosition);

function currentPos(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "8a8ad9029bd968171310f8e561c67847";
  let coordsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

  axios.get(coordsUrl).then(displayWeather);
}
