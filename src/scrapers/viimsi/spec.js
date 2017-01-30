const ViimsiScraper = require('./');

jest.mock('../../html-loaders/loadMarkusHtml', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/getViimsiScreeningsFromHtml', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getViimsiScreeningsFromHtml = require('../../screening-getters/getViimsiScreeningsFromHtml');

const date = new Date(2017, 0, 30);

describe('ViimsiScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getViimsiScreeningsFromHtml.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    ViimsiScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('http://www.viimsikino.ee', 1003, date);
    }));

  it('calls getViimsiScreeningsFromHtml with received HTML', () =>
    ViimsiScraper.scrapeForDate(date).then(() => {
      expect(getViimsiScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('returns object with cinema alias', () =>
    ViimsiScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.cinema).toBe('viimsi');
    }));

  it('returns object with date', () =>
    ViimsiScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.date).toBe(date);
    }));

  it('returns object with screenings', () =>
    ViimsiScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.screenings).toEqual([{}, {}, {}]);
    }));
});
