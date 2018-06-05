/* eslint camelcase: 0 */

const owm = require('./owm');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

// Navbar Stuff

const showSearch = () => {
  $('#searchBtn').addClass('active');
  $('#search').removeClass('hide');
  $('#myForecasts').addClass('hide');
  $('#myForecastsBtn').removeClass('active');
};

const showSavedForecasts = () => {
  $('#searchBtn').removeClass('active');
  $('#search').addClass('hide');
  $('#myForecasts').removeClass('hide');
  $('#myForecastsBtn').addClass('active');
  getAllForecastsEvent();
};

const bindEvents = () => {
  $('#searchBtn').on('click', () => {
    showSearch();
  });
  $('#myForecastsBtn').on('click', () => {
    showSavedForecasts();
  });
};

// Lookup Entered Zipcode

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      if (validateSearch(searchZip)) {
        owm.showResults(searchZip);
        fiveDayBtn(searchZip);
        saveBtnDomEvent();
      } else {
        alert(`That's not a zipcode!`);
      };
    }
  });
};

const validateSearch = (input) => {
  const checkedInput = /^\d+$/.test(input);
  if (checkedInput && input.length === 5) {
    return true;
  } else {
    return false;
  }
};

// Five-day on click

const fiveDayBtn = (userInput) => {
  $(document).on('click', '#fiveday', () => {
    owm.showFiverResults(userInput);
  });
};

// Save Button

const saveBtnDomEvent = () => {
  $(document).on('click', '.save-forecast', (e) => {
    const clickedForecast = $(e.target).closest('.day');
    // const clickedForecastId = $(e.target).closest('.forecast').prevObject[0].offsetParent.id;

    const forecastToAdd = {
      dt_txt: clickedForecast.find('.panel-title').text(),
      temp: clickedForecast.find('.temperature').text(),
      icon: clickedForecast.find('.icon').attr('src'),
      description: clickedForecast.find('.conditions').text(),
      pressure: clickedForecast.find('.pressure').text(),
      speed: clickedForecast.find('.windspeed').text(),
      humidity: clickedForecast.find('.humidity').text(),
      isScary: false,
      dt: clickedForecast.find('.day').attr('id'),
    };

    const button = $(e.target).closest('button');

    firebaseApi.saveForecast(forecastToAdd)
      .then(() => {
        button.html('Saved &#10003;');
      })
      .catch((error) => {
        console.error('an error occurred when saving forecast', error);
      });

    // need to build a new dom string instead of printing to dom
    // dom.savedDomString(clickedForecast);
  });
};

const getAllForecastsEvent = () => {
  firebaseApi.viewSavedForecasts()
    .then((forecastsArray) => {
      dom.savedDomString(forecastsArray);
    })
    .catch((error) => {
      console.error('error in get all forecasts', error);
    });
};

// Initializer for All Events

const initializer = () => {
  pressEnter();
  bindEvents();
};

module.exports = initializer;
