const request = require('request-promise');
const moment = require('moment');

const headers = require('../headers');


const createDateString = date => moment(date).format('DD.MM.YYYY');

const loadMarkusHtml = (url, areaCode, date) =>
  request({
    url,
    qs: {
      TheatreArea: areaCode,
      dt: createDateString(date),
    },
    headers,
  });

module.exports = loadMarkusHtml;
