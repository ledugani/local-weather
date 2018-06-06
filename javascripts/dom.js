// One Day

const oneDayDomString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-6 col-md-4 col-md-offset-4">`;
  strang +=  `<div class="thumbnail forecast">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3>${weatherArray.name}</h3>`;
  strang +=     `<img src="https://openweathermap.org/img/w/${weatherArray.weather[0].icon}.png">`;
  strang +=     `<h4>${Math.ceil(weatherArray.main.temp)}&#8457;, ${weatherArray.weather[0].main}</h4>`;
  strang +=     `<p><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
  strang +=     `<p><strong>Humidity: </strong>${weatherArray.main.humidity}%</p>`;
  strang +=     `<p><button type="button" id="${weatherArray.dt}" class="btn btn-success save-forecast">Save Forecast</button>
  <a href="#" id="fiveday" class="btn btn-default" role="button">5-Day</a></p>`;
  strang +=   `</div>`;
  strang +=  `</div>`;
  strang += `</div>`;

  printToDom('weather', strang);
};

// Five Day

const fiveDayDomString = (weatherArray) => {
  const days = weatherArray.list;
  let newStrang = '';
  let counter = 0;
  days.forEach((day, index) => {
    if (index % 8 === 3) {
      if (counter === 0) {
        newStrang += `<div id="${day.dt}" class="forecast panel panel-info col-md-2 col-md-offset-1 day no-padding">`;
        counter++;
      } else {
        newStrang += `<div id="${day.dt}" class="forecast panel panel-info col-md-2 day no-padding">`;
      };
      newStrang +=  `<div class="panel-heading">`;
      newStrang +=    `<h4 class="panel-title">${day.dt_txt}</h4>`;
      newStrang +=  `</div>`;
      newStrang +=  `<div class="panel-body">`;
      newStrang +=    `<div class="col-md-6 col-sm-6 v-align-center">`;
      newStrang +=      `<img class="icon" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">`;
      newStrang +=      `<h4 class="temperature">${Math.ceil(day.main.temp)}&#8457;, ${day.weather[0].main}</h4>`;
      newStrang +=    `</div>`;
      newStrang +=    `<div class="col-md-6">`;
      newStrang +=     `<h6><strong>Conditions: </strong><p class="conditions">${day.weather[0].description}</p></h6>`;
      newStrang +=     `<h6><strong>Barometric Pressure: </strong><p class="pressure">${day.main.pressure}</p> hPa</h6>`;
      newStrang +=     `<h6><strong>Wind Speed: </strong><p class="windspeed">${day.wind.speed}</p> mph</h6>`;
      newStrang +=     `<h6><strong>Humidity: </strong><p class="humidity">${day.main.humidity}</p>%</h6>`;
      newStrang +=    `</div>`;
      newStrang +=    `<button type="button" class="btn btn-success save-forecast">Save Forecast</button>`;
      newStrang +=  `</div>`;
      newStrang += `</div>`;
      newStrang += `</div>`;
    }
  });
  printToDom('fiver', newStrang);
};

// Saved dom string

const savedDomString = (savedForecast) => {
  let latestDomString = '';
  savedForecast.forEach((forecast) => {
    latestDomString += `<div id="no-padding" class="forecast panel panel-success col-md-4 day" data-firebase-id="${forecast.id}">`;
    latestDomString +=  `<div class="panel-heading">`;
    latestDomString +=    `<h4>${forecast.dt_txt}</h4>`;
    latestDomString +=  `</div>`;
    latestDomString +=  `<div class="panel-body">`;
    latestDomString +=    `<img class="icon" src="${forecast.icon}">`;
    latestDomString +=    `<h4>${forecast.temp}</h4>`;
    latestDomString +=    `<h6><strong>Conditions:</strong> ${forecast.description}</h6>`;
    latestDomString +=    `<h6><strong>Barometric Pressure:</strong> ${forecast.pressure}hPa</h6>`;
    latestDomString +=    `<h6><strong>Wind Speed:</strong> ${forecast.speed}mph</h6>`;
    latestDomString +=    `<h6><strong>Humidity:</strong> ${forecast.humidity}%</h6>`;
    latestDomString +=  `</div>`;
    latestDomString +=  `<div class="panel-footer"><a class="btn deleteForecast">Delete</a></div>`;
    latestDomString += `</div>`;
  });

  printToDom('savedForecasts', latestDomString);
};

const printToDom = (whereToPrint, stringz) => {
  $(`#${whereToPrint}`).html(stringz);
};

module.exports = {
  oneDayDomString,
  fiveDayDomString,
  savedDomString,
  printToDom,
};
