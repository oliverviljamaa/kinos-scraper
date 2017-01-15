const cheerio = require('cheerio');

const loadHtml = html => cheerio.load(html);

module.exports = loadHtml;
