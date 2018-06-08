const {setUID, viewSavedForecasts,} = require('./firebaseApi');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      // User is signed in.
      $('#myForecastsBtn, #searchBtn, #myForecasts, #search').removeClass('hide');
      $('#authScreen, #authBtn').addClass('hide');
      $('.active').removeClass('active');
      $('#searchBtn').addClass('active');
      // call view saved forecasts event
      viewSavedForecasts();
    } else {
      // No user is signed in.
    }
  });
};

module.exports = {
  checkLoginStatus,
};
