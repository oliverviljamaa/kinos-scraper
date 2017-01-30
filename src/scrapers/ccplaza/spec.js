const CcPlazaScraper = require('./');

jest.mock('../../html-loaders/loadMarkusHtml', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/getForumCinemasScreeningsFromHtml', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/loadMarkusHtml');
const getForumCinemasScreeningsFromHtml = require('../../screening-getters/getForumCinemasScreeningsFromHtml');

const date = new Date(2017, 0, 30);

describe('CcPlazaScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getForumCinemasScreeningsFromHtml.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    CcPlazaScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('https://www.forumcinemas.ee', 1008, date);
    }));

  it('calls getForumCinemasScreeningsFromHtml with received HTML', () =>
    CcPlazaScraper.scrapeForDate(date).then(() => {
      expect(getForumCinemasScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('returns object with cinema alias', () =>
    CcPlazaScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.cinema).toBe('ccplaza');
    }));

  it('returns object with date', () =>
    CcPlazaScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.date).toBe(date);
    }));

  it('returns object with screenings', () =>
    CcPlazaScraper.scrapeForDate(date).then((screeningsObj) => {
      expect(screeningsObj.screenings).toEqual([{}, {}, {}]);
    }));
});
