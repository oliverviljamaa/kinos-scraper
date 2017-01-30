const ArtisScraper = require('./artis');
const CcPlazaScraper = require('./ccplaza');
const KosmosScraper = require('./kosmos');
const MustamaeScraper = require('./mustamae');
const SolarisScraper = require('./solaris');
const SoprusScraper = require('./soprus');
const ViimsiScraper = require('./viimsi');

const scrapers = [
  ArtisScraper,
  CcPlazaScraper,
  KosmosScraper,
  MustamaeScraper,
  SolarisScraper,
  SoprusScraper,
  ViimsiScraper,
];

module.exports = scrapers;
