const loadMarkusHtml = require('../../html-loaders/markus');
const getForumCinemasScreeningsFromHtml = require('../../screening-getters/forum-cinemas');
const groupByMovie = require('../../transformers/groupByMovie');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.forumcinemas.ee', 1008, date)
    .then(getForumCinemasScreeningsFromHtml)
    .then(groupByMovie)
    .then(movies => ({
      cinema: 'ccplaza',
      date,
      movies,
    }));

module.exports = { scrapeForDate };
