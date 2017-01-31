const loadMarkusHtml = require('../../html-loaders/markus');
const getForumCinemasScreeningsFromHtml = require('../../screening-getters/forum-cinemas');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.forumcinemas.ee', 1008, date)
    .then(getForumCinemasScreeningsFromHtml)
    .then(screenings => ({ cinema: 'ccplaza', date, screenings }));

module.exports = { scrapeForDate };
