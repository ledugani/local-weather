const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-6 col-md-4">`;
  strang +=  `<div class="thumbnail">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3>${weatherArray.name}</h3>`;
  strang +=     `<h4>${weatherArray.main.temp}&#8457;</h4>`;
  strang +=     `<p><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
  strang +=     `<p><a href="#" class="btn btn-default" role="button">3-Day</a> <a href="#" class="btn btn-default" role="button">5-Day</a></p>`;
  strang +=   `</div>`;
  strang +=  `</div>`;
  strang += `</div>`;

  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weather').html(stringz);
};

module.exports = {
  domString,
};
