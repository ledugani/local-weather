const owm = require('./owm');
const dom = require('./dom');

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
    const forecastToAdd = $(e.target).closest('.forecast');
    // need to build a new dom string instead of printing to dom
    dom.printToDom('savedForecasts', forecastToAdd);
  });
};

// Initializer for All Events

const initializer = () => {
  pressEnter();
  bindEvents();
};

module.exports = initializer;
