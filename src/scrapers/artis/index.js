const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getArtisScreeningsFromHtml = require('../../screening-getters/getArtisScreeningsFromHtml');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.kino.ee', 1002, date)
    .then(getArtisScreeningsFromHtml)
    .then(screenings => ({ cinema: 'artis', date, screenings }));

module.exports = { scrapeForDate };
