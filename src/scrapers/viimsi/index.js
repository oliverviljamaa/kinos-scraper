const loadMarkusHtml = require('../../html-loaders/markus');
const getViimsiScreeningsFromHtml = require('../../screening-getters/viimsi');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.viimsikino.ee', 1003, date)
    .then(getViimsiScreeningsFromHtml)
    .then(screenings => ({ cinema: 'viimsi', date, screenings }));

module.exports = { scrapeForDate };
