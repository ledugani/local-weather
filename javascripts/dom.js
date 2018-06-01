
// One Day

const oneDayDomString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-6 col-md-4 col-md-offset-4">`;
  strang +=  `<div class="thumbnail">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3>${weatherArray.name}</h3>`;
  strang +=     `<img src="https://openweathermap.org/img/w/${weatherArray.weather[0].icon}.png">`;
  strang +=     `<h4>${Math.ceil(weatherArray.main.temp)}&#8457;</h4>`;
  strang +=     `<p><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
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
  days.forEach((day, index) => {
    if (index % 8 === 3) {
      newStrang += `<div class="col-sm-6 col-md-4">`;
      newStrang +=  `<div class="thumbnail">`;
      newStrang +=    `<h4>${day.dt_txt}</h4>`;
      newStrang +=    `<img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">`;
      newStrang +=  `</div>`;
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
