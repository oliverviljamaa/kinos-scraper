const MustamaeScraper = require('./');

jest.mock('../../html-loaders/markus', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/apollo', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
jest.mock('../../transformers/groupByMovie', () => jest.fn(() => Promise.resolve([
  {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/markus');
const getApolloScreeningsFromHtml = require('../../screening-getters/apollo');
const groupByMovie = require('../../transformers/groupByMovie');

const date = new Date(2017, 0, 30);

describe('MustamaeScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getApolloScreeningsFromHtml.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    MustamaeScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('https://www.apollokino.ee', 1007, date);
    }));

  it('calls getApolloScreeningsFromHtml with received HTML', () =>
    MustamaeScraper.scrapeForDate(date).then(() => {
      expect(getApolloScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('calls groupByMovie with received screenings', () =>
    MustamaeScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    MustamaeScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('mustamae');
    }));

  it('returns object with date', () =>
    MustamaeScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    MustamaeScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
