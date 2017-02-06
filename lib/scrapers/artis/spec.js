const ArtisScraper = require('./');

jest.mock('../../html-loaders/markus', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/artis', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
jest.mock('../../transformers/groupByMovie', () => jest.fn(() => Promise.resolve([
  {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/markus');
const getArtisScreeningsFromHtml = require('../../screening-getters/artis');
const groupByMovie = require('../../transformers/groupByMovie');

const date = new Date(2017, 0, 30);

describe('ArtisScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getArtisScreeningsFromHtml.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    ArtisScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('http://www.kino.ee', 1002, date);
    }));

  it('calls getArtisScreeningsFromHtml with received HTML', () =>
    ArtisScraper.scrapeForDate(date).then(() => {
      expect(getArtisScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('calls groupByMovie with received screenings', () =>
    ArtisScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    ArtisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('artis');
    }));

  it('returns object with date', () =>
    ArtisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    ArtisScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
