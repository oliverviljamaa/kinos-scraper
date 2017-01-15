const request = require('request-promise');

const headers = require('../headers');
const loadHtml = require('../loadHtml');

const loadKosmosHtml = () =>
  request({
    url: 'https://kinokosmos.ee/kinokava',
    headers,
  })
  .then(loadHtml);

module.exports = loadKosmosHtml;
