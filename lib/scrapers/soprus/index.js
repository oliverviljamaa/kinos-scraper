const loadSoprusHtml = require('../../html-loaders/soprus');
const getSoprusScreeningsFromHtmlForDate = require('../../screening-getters/soprus');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadSoprusHtml()
    .then(html => getSoprusScreeningsFromHtmlForDate(html, date))
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'soprus',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
