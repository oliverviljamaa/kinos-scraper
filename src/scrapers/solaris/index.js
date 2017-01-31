const loadMarkusHtml = require('../../html-loaders/markus');
const getScreeningsFromHtml = require('../../screening-getters/apollo');

const scrapeForDate = date =>
  loadMarkusHtml('https://www.apollokino.ee', 1005, date)
    .then(getScreeningsFromHtml)
    .then(screenings => ({ cinema: 'solaris', date, screenings }));

module.exports = { scrapeForDate };
