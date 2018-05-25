const owm = require('./owm');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      owm.showResults(searchZip);
    }
  });
};

module.exports = pressEnter;
