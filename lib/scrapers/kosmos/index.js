const loadKosmosHtml = require('../../html-loaders/kosmos');
const getKosmosScreeningsFromHtmlForDate = require('../../screening-getters/kosmos');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadKosmosHtml()
    .then(html => getKosmosScreeningsFromHtmlForDate(html, date))
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'kosmos',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
