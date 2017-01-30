const ArtisScraper = require('./');

jest.mock('../../html-loaders/loadMarkusHtml', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/getArtisScreeningsFromHtml', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getArtisScreeningsFromHtml = require('../../screening-getters/getArtisScreeningsFromHtml');

const date = new Date(2017, 0, 30);

describe('ArtisScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getArtisScreeningsFromHtml.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    ArtisScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('http://www.kino.ee', 1002, date);
    }));

  it('calls getArtisScreeningsFromHtml with received HTML', () =>
    ArtisScraper.scrapeForDate(date).then(() => {
      expect(getArtisScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('returns object with cinema alias', () =>
    ArtisScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.cinema).toBe('artis');
    }));

  it('returns object with date', () =>
    ArtisScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.date).toBe(date);
    }));

  it('returns object with screenings', () =>
    ArtisScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.screenings).toEqual([{}, {}, {}]);
    }));
});
