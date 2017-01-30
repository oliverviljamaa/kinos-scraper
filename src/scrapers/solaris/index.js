const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getScreeningsFromHtml = require('../../screening-getters/getApolloScreeningsFromHtml');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.apollokino.ee', 1005, date)
    .then(getScreeningsFromHtml)
    .then(screenings => ({ cinema: 'solaris', date, screenings }));

module.exports = { scrapeForDate };
