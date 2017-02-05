const loadMarkusHtml = require('../../html-loaders/markus');
const getArtisScreeningsFromHtml = require('../../screening-getters/artis');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.kino.ee', 1002, date)
    .then(getArtisScreeningsFromHtml)
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'artis',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
