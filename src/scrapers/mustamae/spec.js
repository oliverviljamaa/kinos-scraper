const MustamaeScraper = require('./');

jest.mock('../../html-loaders/loadMarkusHtml', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/getApolloScreeningsFromHtml', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getApolloScreeningsFromHtml = require('../../screening-getters/getApolloScreeningsFromHtml');

const date = new Date(2017, 0, 30);

describe('MustamaeScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getApolloScreeningsFromHtml.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    MustamaeScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('https://www.apollokino.ee', 1007, date);
    }));

  it('calls getApolloScreeningsFromHtml with received HTML', () =>
    MustamaeScraper.scrapeForDate(date).then(() => {
      expect(getApolloScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('returns object with cinema alias', () =>
    MustamaeScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.cinema).toBe('mustamae');
    }));

  it('returns object with date', () =>
    MustamaeScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.date).toBe(date);
    }));

  it('returns object with screenings', () =>
    MustamaeScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.screenings).toEqual([{}, {}, {}]);
    }));
});
