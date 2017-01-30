const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getScreeningsFromHtml = require('../../screening-getters/getApolloScreeningsFromHtml');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.apollokino.ee', 1007, date)
    .then(getScreeningsFromHtml)
    .then(screenings => ({ cinema: 'mustamae', date, screenings }));

module.exports = { scrapeForDate };
