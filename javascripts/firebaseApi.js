let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const saveForecast = (newForecast) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
      data: JSON.stringify(newForecast),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((errrr) => {
        reject(errrr);
      });
  });
};

const viewSavedForecasts = () => {
  return new Promise((resolve, reject) => {
    const allForecastsArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
    })
      .done((allForecastsObj) => {
        if (allForecastsObj !== null) {
          Object.keys(allForecastsObj).forEach((fbkey) => {
            allForecastsObj[fbkey].id = fbkey;
            allForecastsArray.push(allForecastsObj[fbkey]);
          });
        }
        resolve(allForecastsArray);
      })
      .fail((errr) => {
        reject(errr);
      });
  });
};

const deleteForecastFromDb = (forecastId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveForecast,
  setConfig,
  viewSavedForecasts,
  deleteForecastFromDb,
};