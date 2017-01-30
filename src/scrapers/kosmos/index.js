const loadKosmosHtml = require('../../html-loaders/loadKosmosHtml');
const getKosmosScreeningsFromHtmlForDate = require('../../screening-getters/getKosmosScreeningsFromHtmlForDate');

const scrapeForDate = date =>
  loadKosmosHtml()
    .then(html => getKosmosScreeningsFromHtmlForDate(html, date))
    .then(screenings => ({ cinema: 'kosmos', date, screenings }));

module.exports = { scrapeForDate };
