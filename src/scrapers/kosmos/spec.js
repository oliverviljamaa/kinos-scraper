const KosmosScraper = require('./');

jest.mock('../../html-loaders/kosmos', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/kosmos', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
const loadKosmosHtml = require('../../html-loaders/kosmos');
const getKosmosScreeningsFromHtmlForDate = require('../../screening-getters/kosmos');

const date = new Date(2017, 0, 30);

describe('KosmosScraper', () => {
  afterEach(() => {
    loadKosmosHtml.mockClear();
    getKosmosScreeningsFromHtmlForDate.mockClear();
  });

  it('calls loadKosmosHtml', () =>
    KosmosScraper.scrapeForDate(date).then(() => {
      expect(loadKosmosHtml).toHaveBeenCalled();
    }));

  it('calls getKosmosScreeningsFromHtmlForDate with received HTML and date', () =>
    KosmosScraper.scrapeForDate(date).then(() => {
      expect(getKosmosScreeningsFromHtmlForDate).toHaveBeenCalledWith('HTML', date);
    }));

  it('returns object with cinema alias', () =>
    KosmosScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.cinema).toBe('kosmos');
    }));

  it('returns object with date', () =>
    KosmosScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.date).toBe(date);
    }));

  it('returns object with screenings', () =>
    KosmosScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.screenings).toEqual([{}, {}, {}]);
    }));
});
