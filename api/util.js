const firstToUpperCase = property => property.charAt(0).toUpperCase() + property.slice(1);
const firstToLowerCase = property => property.charAt(0).toLowerCase() + property.slice(1);

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports = { numberWithCommas, firstToUpperCase, firstToLowerCase };
