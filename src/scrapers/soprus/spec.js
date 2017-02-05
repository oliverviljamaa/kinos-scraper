const SoprusScraper = require('./');

jest.mock('../../html-loaders/soprus', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/soprus', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
jest.mock('../../transformers/groupByMovie', () => jest.fn(() => Promise.resolve([
  {}, {},
])));
const loadSoprusHtml = require('../../html-loaders/soprus');
const getSoprusScreeningsFromHtmlForDate = require('../../screening-getters/soprus');
const groupByMovie = require('../../transformers/groupByMovie');

const date = new Date(2017, 0, 30);

describe('SoprusScraper', () => {
  afterEach(() => {
    loadSoprusHtml.mockClear();
    getSoprusScreeningsFromHtmlForDate.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadSoprusHtml with no params', () =>
    SoprusScraper.scrapeForDate(date).then(() => {
      expect(loadSoprusHtml).toHaveBeenCalledWith();
    }));

  it('calls getSoprusScreeningsFromHtmlForDate with received HTML and date', () =>
    SoprusScraper.scrapeForDate(date).then(() => {
      expect(getSoprusScreeningsFromHtmlForDate).toHaveBeenCalledWith('HTML', date);
    }));

  it('calls groupByMovie with received screenings', () =>
    SoprusScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    SoprusScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('soprus');
    }));

  it('returns object with date', () =>
    SoprusScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    SoprusScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
