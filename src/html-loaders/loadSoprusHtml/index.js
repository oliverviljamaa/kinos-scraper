const request = require('request-promise');

const headers = require('../headers');
const loadHtml = require('../loadHtml');

const loadSoprusHtml = () =>
  request({
    url: 'http://kinosoprus.ee',
    headers,
  })
  .then(loadHtml);

module.exports = loadSoprusHtml;
