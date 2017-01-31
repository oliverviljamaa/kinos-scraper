const loadKosmosHtml = require('../../html-loaders/kosmos');
const getKosmosScreeningsFromHtmlForDate = require('../../screening-getters/kosmos');

const scrapeForDate = date =>
  loadKosmosHtml()
    .then(html => getKosmosScreeningsFromHtmlForDate(html, date))
    .then(screenings => ({ cinema: 'kosmos', date, screenings }));

module.exports = { scrapeForDate };
