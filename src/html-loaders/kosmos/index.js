const request = require('request-promise');

const headers = require('../headers');


const loadKosmosHtml = () =>
  request({
    url: 'https://kinokosmos.ee/kinokava',
    headers,
  });

module.exports = loadKosmosHtml;
