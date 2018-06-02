/* eslint camelcase: 0 */

const dom = require('./dom');

let owmKey = '';

const setKey = (key) => {
  owmKey = key;
};

// Current Weather

const enterZipCodeForOneDay = (text) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${text},us&appid=${owmKey}&units=imperial`)
      .done((results) => {
        resolve(results);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const showResults = (searchText) => {
  enterZipCodeForOneDay(searchText)
    .then((results) => {
      dom.oneDayDomString(results);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

// Five-Day Weather

const enterZipCodeForFiveDay = (text) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${text}&appid=${owmKey}&units=imperial`)
      .done((results) => {
        resolve(results);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const showFiverResults = (searchText) => {
  enterZipCodeForFiveDay(searchText)
    .then((results) => {
      dom.fiveDayDomString(results);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  showResults,
  setKey,
  showFiverResults,
};
