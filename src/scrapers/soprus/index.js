const loadSoprusHtml = require('../../html-loaders/loadSoprusHtml');
const getSoprusScreeningsFromHtmlForDate = require('../../screening-getters/getSoprusScreeningsFromHtmlForDate');

const scrapeForDate = date =>
  loadSoprusHtml()
    .then(html => getSoprusScreeningsFromHtmlForDate(html, date))
    .then(screenings => ({ cinema: 'soprus', date, screenings }));

module.exports = { scrapeForDate };
