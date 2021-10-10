//Date format

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedneday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayss = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let rn = document.querySelector("#todaysdate");
rn.innerHTML = `${dayss} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// Small temperatures

function formatingday(time) {
  let date = new Date(time * 1000);
  let dayy = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[dayy];
}

function displaysmalltemp(response) {
  let forecastdata = response.data.daily;
  let forecast = document.querySelector(".forecasting");

  let forecastHTML = `<div class="row">`;
  forecastdata.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML /* what we had before + */ +
        `
        <div class="col-2">
            <div class="smalldate">${formatingday(day.dt)}</div>
            <img
                src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png"
                alt="
                width="42"
            />
            <div class="smalltemp">
                <span class="smalltempmax">${Math.round(day.temp.max)}° </span>
                <span class="smalltempmin">${Math.round(day.temp.min)}°</span>
            </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getforecastdata(coordinates) {
  let apiKey = "0f09999277a51ab64fafe9b26b76e135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaysmalltemp);
}

//Temperature depending on city

function showtemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celciustemp = response.data.main.temp;
  document.querySelector(".temp").innerHTML = Math.round(celciustemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".desc").innerHTML =
    response.data.weather[0].description;
  displaysmalltemp();

  //Icon picture
  let iconn = document.querySelector(".icon");
  iconn.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getforecastdata(response.data.coord);
}

function cityinput(city) {
  let apiKey = "0f09999277a51ab64fafe9b26b76e135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputform").value;
  cityinput(city);
}
let searchForm = document.querySelector("#formm");
searchForm.addEventListener("submit", handleSubmit);
