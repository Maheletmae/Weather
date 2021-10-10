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

function displaysmalltemp(event) {
  let forecast = document.querySelector(".forecasting");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML /* what we had before + */ +
      `
    <div class="row">
        <div class="col-2">
            <div class="smalldate">${day}</div>
            <img
                src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                alt="smallicon"
                class="smallicon"
            />
            <div class="smalltemp">
                <span class="smalltempmax">18° </span>
                <span class="smalltempmin">12°</span>
            </div>
        </div>
    </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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
  forecast();
  let celciustemp = response.data.main.temp;

  //Icon picture
  let iconn = document.querySelector(".icon");
  iconn.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function changedegreetoF(event) {
  event.preventDefault();
  let number = document.querySelector(".temp");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitt = (response.data.main.temp * 9) / 5 + 32;

  number.innerHTML = Math.round(fahrenheitt);
}
function changedegreetoC(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let number = document.querySelector(".temp");
  number.innerHTML = Math.round(response.data.main.temp);
}
let celciustemp = null;
let touchlinkC = document.querySelector(".celcius");
let touchlinkF = document.querySelector(".fahrenheit");
touchlinkC.addEventListener("click", changedegreetoC);
touchlinkF.addEventListener("click", changedegreetoF);
