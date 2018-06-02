const owm = require('./owm');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      if (validateSearch(searchZip)) {
        owm.showResults(searchZip);
        fiveDayBtn(searchZip);
      } else {
        alert(`That's not a zipcode!`);
      };
    }
  });
};

const fiveDayBtn = (userInput) => {
  $(document).on('click', '#fiveday', () => {
    owm.showFiverResults(userInput);
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

const initializer = () => {
  pressEnter();
  bindEvents();
};

module.exports = initializer;
