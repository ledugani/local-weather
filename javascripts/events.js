const owm = require('./owm');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      if (validateSearch(searchZip)) {
        owm.showResults(searchZip);
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

module.exports = pressEnter;
