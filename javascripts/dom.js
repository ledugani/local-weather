
// One Day

const oneDayDomString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-6 col-md-4 col-md-offset-4">`;
  strang +=  `<div class="thumbnail">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3>${weatherArray.name}</h3>`;
  strang +=     `<img src="https://openweathermap.org/img/w/${weatherArray.weather[0].icon}.png">`;
  strang +=     `<h4>${Math.ceil(weatherArray.main.temp)}&#8457;, ${weatherArray.weather[0].main}</h4>`;
  strang +=     `<p><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
  strang +=     `<p><strong>Humidity: </strong>${weatherArray.main.humidity}%</p>`;
  strang +=     `<p><a href="#" id="threeday" class="btn btn-default" role="button">3-Day</a> <a href="#" id="fiveday" class="btn btn-default" role="button">5-Day</a></p>`;
  strang +=   `</div>`;
  strang +=  `</div>`;
  strang += `</div>`;

  printToOneDay(strang);
};

const printToOneDay = (stringz) => {
  $('#weather').html(stringz);
};

// Five Day

const fiveDayDomString = (weatherArray) => {
  const days = weatherArray.list;
  let newStrang = '';
  let counter = 0;
  days.forEach((day, index) => {
    if (index % 8 === 3) {
      if (counter === 0) {
        newStrang += `<div class="panel panel-info col-md-2 col-md-offset-1 day">`;
        counter++;
      } else {
        newStrang += `<div class="panel panel-info col-md-2 day">`;
      };
      newStrang +=  `<div class="panel-heading">`;
      newStrang +=    `<h4 class="panel-title">${day.dt_txt}</h4>`;
      newStrang +=  `</div>`;
      newStrang +=  `<div class="panel-body">`;
      newStrang +=    `<div class="col-md-6 col-sm-6">`;
      newStrang +=      `<img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">`;
      newStrang +=      `<h4>${Math.ceil(day.main.temp)}&#8457;, ${day.weather[0].main}</h4>`;
      newStrang +=    `</div>`;
      newStrang +=    `<div class="col-md-6">`;
      newStrang +=     `<h6><strong>Conditions: </strong>${day.weather[0].description}</h6>`;
      newStrang +=     `<p><strong>Barometric Pressure: </strong>${day.main.pressure} hPa</p>`;
      newStrang +=     `<p><strong>Wind Speed: </strong>${day.wind.speed} mph</p>`;
      newStrang +=     `<p><strong>Humidity: </strong>${day.main.humidity}%</p>`;
      newStrang +=    `</div>`;
      newStrang +=  `</div>`;
      newStrang += `</div>`;
      newStrang += `</div>`;
    }
  });
  printToFiveDay(newStrang);
};

const printToFiveDay = (strangz) => {
  $('#fiver').html(strangz);
};

module.exports = {
  oneDayDomString,
  fiveDayDomString,
};
