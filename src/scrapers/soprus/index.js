const loadSoprusHtml = require('../../html-loaders/soprus');
const getSoprusScreeningsFromHtmlForDate = require('../../screening-getters/soprus');

const scrapeForDate = date =>
  loadSoprusHtml()
    .then(html => getSoprusScreeningsFromHtmlForDate(html, date))
    .then(screenings => ({ cinema: 'soprus', date, screenings }));

module.exports = { scrapeForDate };
