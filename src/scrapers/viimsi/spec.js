const ViimsiScraper = require('./');

jest.mock('../../html-loaders/markus', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/viimsi', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
jest.mock('../../transformers/groupByMovie', () => jest.fn(() => Promise.resolve([
  {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/markus');
const getViimsiScreeningsFromHtml = require('../../screening-getters/viimsi');
const groupByMovie = require('../../transformers/groupByMovie');

const date = new Date(2017, 0, 30);

describe('ViimsiScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getViimsiScreeningsFromHtml.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    ViimsiScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('http://www.viimsikino.ee', 1003, date);
    }));

  it('calls getViimsiScreeningsFromHtml with received HTML', () =>
    ViimsiScraper.scrapeForDate(date).then(() => {
      expect(getViimsiScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('calls groupByMovie with received screenings', () =>
    ViimsiScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    ViimsiScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('viimsi');
    }));

  it('returns object with date', () =>
    ViimsiScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    ViimsiScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
