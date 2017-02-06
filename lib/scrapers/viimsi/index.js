const loadMarkusHtml = require('../../html-loaders/markus');
const getViimsiScreeningsFromHtml = require('../../screening-getters/viimsi');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadMarkusHtml('http://www.viimsikino.ee', 1003, date)
    .then(getViimsiScreeningsFromHtml)
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'viimsi',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
