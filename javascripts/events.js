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

// delete button
const deleteBtnEvent = () => {
  $(document).on('click', '.deleteForecast', (e) => {
    const clickedForecastId = $(e.target).closest('.forecast').data('firebaseId');
    firebaseApi.deleteForecastFromDb(clickedForecastId)
      .then(() => {
        getAllForecastsEvent();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

// scary button event
const scaryBtnEvent = () => {
  $(document).on('click', '.scarryBtn', (e) => {
    const forecastToUpdateId = $(e.target).closest('.forecast').data('firebaseId');
    const clickedForecast = $(e.target).closest('.forecast');
    const updatedForecast = {
      dt_txt: clickedForecast.find('.panel-title').text(),
      temp: clickedForecast.find('.temperature').text(),
      icon: clickedForecast.find('.icon').attr('src'),
      description: clickedForecast.find('.conditions').text(),
      pressure: clickedForecast.find('.pressure').text(),
      speed: clickedForecast.find('.windspeed').text(),
      humidity: clickedForecast.find('.humidity').text(),
      isScary: true,
      dt: clickedForecast.find('.day').attr('id'),
    };

    firebaseApi.updateForecastInDb(updatedForecast, forecastToUpdateId)
      .then(() => {
        getAllForecastsEvent();
      })
      .catch((errrrrrorrrrrr) => {
        console.error('error in updating forecast: ', errrrrrorrrrrr);
      });
  });
};

// view saved forecasts

const getAllForecastsEvent = () => {
  firebaseApi.viewSavedForecasts()
    .then((forecastsArray) => {
      dom.savedDomString(forecastsArray);
    })
    .catch((error) => {
      console.error('error in get all forecasts', error);
    });
};

// authentication events
const authEvents = () => {
  $('#sign-in-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        $('.active').removeClass('active');
        $('#searchBtn').addClass('active');
        $('#authScreen, #authBtn').addClass('hide');
        $('#search, #myForecastsBtn, #searchBtn, #logout').removeClass('hide');
        getAllForecastsEvent();
        $('#signin-error').addClass('hide');
      })
      .catch((error) => {
        $('#signin-error').removeClass('hide');
        $('#signin-error-msg').text(error.message);
        console.error(error.message);
      });
  });

  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const password = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        $('.active').removeClass('active');
        $('#searchBtn').addClass('active');
        $('#authScreen, #authBtn').addClass('hide');
        $('#search, #myForecastsBtn, #searchBtn, #logout').removeClass('hide');
        getAllForecastsEvent();
        $('#signin-error').addClass('hide');
      })
      .catch((error) => {
        $('#register-error').removeClass('hide');
        $('#register-error-msg').text(error.message);
        console.error(error.message);
      });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#sign-in-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout').click(() => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        $('#myForecasts, #search, #searchBtn, #myForecastsBtn, #logout').addClass('hide');
        $('#authScreen, #authBtn').removeClass('hide');
        $('.active').removeClass('active');
        $('#authBtn').addClass('active');
        $('#weather, #fiver').html('');
        $('#searchBar').val('');
        $('#registerEmail').val('');
        $('#registerPassword').val('');
        $('#inputEmail').val('');
        $('#inputPassword').val('');
      })
      .catch((error) => {
        // An error happened.
        console.error('an error occurred when signing out', error);
      });
  });
};

// Initializer for All Events

const initializer = () => {
  pressEnter();
  bindEvents();
  deleteBtnEvent();
  scaryBtnEvent();
  authEvents();
};

module.exports = initializer;
