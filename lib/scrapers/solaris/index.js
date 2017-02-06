const loadMarkusHtml = require('../../html-loaders/markus');
const getScreeningsFromHtml = require('../../screening-getters/apollo');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.apollokino.ee', 1005, date)
    .then(getScreeningsFromHtml)
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'solaris',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
