const loadMarkusHtml = require('../../html-loaders/markus');
const getArtisScreeningsFromHtml = require('../../screening-getters/artis');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.kino.ee', 1002, date)
    .then(getArtisScreeningsFromHtml)
    .then(screenings => ({ cinema: 'artis', date, screenings }));

module.exports = { scrapeForDate };
