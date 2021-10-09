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

//Temperature depending on city

function showtemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".desc").innerHTML = response.data.weather[0].main;
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

//Degree's unit change

function changedegreeF(event) {
  event.preventDefault();
  let number = document.querySelector(".temp");
  number.innerHTML = 66;
}
function changedegreeC(event) {
  event.preventDefault();
  let number = document.querySelector(".temp");
  number.innerHTML = 19;
}
let touchlinkC = document.querySelector(".celcius");
let touchlinkF = document.querySelector(".fahrenheit");
touchlinkC.addEventListener("click", changedegreeC);
touchlinkF.addEventListener("click", changedegreeF);
