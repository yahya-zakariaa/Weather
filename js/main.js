let searchInp = document.querySelector("#searchInp");
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// current day element
let currentDay = document.querySelector("#currentDay");
let currentMonth = document.querySelector("#currentMonth");
let currentStrDay = document.querySelector("#currentStrDay");
let currentRegion = document.querySelector("#currentRegion");
let currentTemp = document.querySelector("#currentTemp");
let currentStatusIcon = document.querySelector("#currentStatusIcon");
let currentStatus = document.querySelector("#currentStatus");
let currentWindSpeed = document.querySelector("#currentWindSpeed");
let currentWindDir = document.querySelector("#currentWindDir");
let currentDew = document.querySelector("#currentDewPoint");
// sec day element
let secDay = document.querySelector("#secDay");
let secDayicon = document.querySelector("#secDayIcon");
let secDayMaxTemp = document.querySelector("#secDayMaxTemp");
let secDayMinTemp = document.querySelector("#secDayMinTemp");
let secDayStrStatus = document.querySelector("#secDayStrStatus");
// trd day element
let trdDay = document.querySelector("#trdDay");
let trdDayicon = document.querySelector("#trdDayIcon");
let trdDayMaxTemp = document.querySelector("#trdDayMaxTemp");
let trdDayMinTemp = document.querySelector("#trdDayMinTemp");
let trdDayStrStatus = document.querySelector("#trdDayStrStatus");
searchInp.addEventListener("keyup", function () {
  let searchValue = searchInp.value;
  if (searchValue.length >= 3) {
    mainCardWearther(searchValue);
  }
});

async function mainCardWearther(userSearch) {
  try {
    // get current ip for user
    let mainReq = await fetch(
      `http://api.weatherapi.com/v1/ip.json?key=59bb54ac9f864f91892221407241706&q=auto:ip`
    );
    let mainReqData = await mainReq.json();
    if (mainReqData.length !== 0) {
      let currentWeather = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=59bb54ac9f864f91892221407241706&q=${
          userSearch || mainReqData.ip
        }&days=3`
      );
      var weatherData = await currentWeather.json();
    }
    let date = new Date(`${weatherData.forecast.forecastday[0].date}`)
      .toDateString()
      .split(" ");
    // current card get api
    currentDay.innerHTML = `${date[2]}`;
    currentDay.innerHTML += ` ${date[1]}`;
    currentStrDay.innerHTML = ` ${date[0]}`;
    currentRegion.innerHTML = `${weatherData.location.country}, ${weatherData.location.name}`;
    currentTemp.innerHTML = `${weatherData.current.temp_c}°C`;
    currentStatusIcon.innerHTML = `<img width="90" src="${weatherData.current.condition.icon}"/>`;
    currentStatus.innerHTML = `${weatherData.current.condition.text}`;
    currentDew.innerHTML = `<i class="fa-solid fa-cloud-rain"></i> ${weatherData.current.dewpoint_c}%`;
    currentWindSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${weatherData.current.wind_kph} km/h`;
    currentWindDir.innerHTML = weatherData.current.wind_dir;
    currentWindDir.innerHTML += `<i class="ps-2  fa-solid fa-location-arrow"  style="transform: rotate(${weatherData.current.wind_degree}deg);   transform-origin:right;" ></i> `;
    console.log(date);
    console.log(weatherData);

    // sec card get api
    let secDayDate = new Date(`${weatherData.forecast.forecastday[1].date}`);
    secDay.innerHTML = `${dayNames[secDayDate.getDay()]}`;
    secDayicon.innerHTML = `<img src="${weatherData.forecast.forecastday[1].day.condition.icon}"/>`;
    secDayMaxTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}°C`;
    secDayMinTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}°C`;
    secDayStrStatus.innerHTML = `${weatherData.forecast.forecastday[1].day.condition.text}`;
    // trd card get api
    let trdDayDate = new Date(`${weatherData.forecast.forecastday[2].date}`);
    trdDay.innerHTML = `${dayNames[trdDayDate.getDay()]}`;
    trdDayicon.innerHTML = `<img src="${weatherData.forecast.forecastday[2].day.condition.icon}"/>`;
    trdDayMaxTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}°C`;
    trdDayMinTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}°C`;
    trdDayStrStatus.innerHTML = `${weatherData.forecast.forecastday[2].day.condition.text}`;
  } catch {
    console
  }
}

mainCardWearther();
