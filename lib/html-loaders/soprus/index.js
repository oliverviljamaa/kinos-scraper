const request = require('request-promise');

const headers = require('../headers');


const loadSoprusHtml = () => request({ url: 'http://kinosoprus.ee', headers });

module.exports = loadSoprusHtml;
