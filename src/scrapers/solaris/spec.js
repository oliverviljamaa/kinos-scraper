const SolarisScraper = require('./');

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

describe('SolarisScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getApolloScreeningsFromHtml.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    SolarisScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('https://www.apollokino.ee', 1005, date);
    }));

  it('calls getApolloScreeningsFromHtml with received HTML', () =>
    SolarisScraper.scrapeForDate(date).then(() => {
      expect(getApolloScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('calls groupByMovie with received screenings', () =>
    SolarisScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    SolarisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('solaris');
    }));

  it('returns object with date', () =>
    SolarisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    SolarisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
