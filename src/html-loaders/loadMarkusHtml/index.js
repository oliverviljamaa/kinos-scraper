const request = require('request-promise');
const dateFormat = require('dateformat');

const headers = require('../headers');
const loadHtml = require('../loadHtml');


const createDateString = date => dateFormat(date, 'dd.mm.yyyy');

const createRequestOptions = (url, areaCode, date) => ({
  url,
  qs: {
    TheatreArea: areaCode,
    dt: createDateString(date),
  },
  headers,
});

const loadMarkusHtml = (url, areaCode, date) =>
  request(createRequestOptions(url, areaCode, date)).then(loadHtml);

module.exports = loadMarkusHtml;
