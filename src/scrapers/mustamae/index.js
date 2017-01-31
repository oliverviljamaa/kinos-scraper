const loadMarkusHtml = require('../../html-loaders/markus');
const getScreeningsFromHtml = require('../../screening-getters/apollo');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.apollokino.ee', 1007, date)
    .then(getScreeningsFromHtml)
    .then(screenings => ({ cinema: 'mustamae', date, screenings }));

module.exports = { scrapeForDate };
