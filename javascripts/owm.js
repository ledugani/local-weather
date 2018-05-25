/* eslint camelcase: 0 */

const dom = require('./dom');

let owmKey = '';

const setKey = (key) => {
  owmKey = key;
};

const enterZipCode = (text) => {
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
  enterZipCode(searchText)
    .then((results) => {
      dom.domString(results);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  showResults,
  setKey,
};
