const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getViimsiScreeningsFromHtml = require('../../screening-getters/getViimsiScreeningsFromHtml');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.viimsikino.ee', 1003, date)
    .then(getViimsiScreeningsFromHtml)
    .then(screenings => ({ cinema: 'viimsi', date, screenings }));

module.exports = { scrapeForDate };
