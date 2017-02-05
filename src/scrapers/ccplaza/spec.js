const CcPlazaScraper = require('./');

jest.mock('../../html-loaders/markus', () => jest.fn(() => Promise.resolve('HTML')));
jest.mock('../../screening-getters/forum-cinemas', () => jest.fn(() => Promise.resolve([
  {}, {}, {},
])));
jest.mock('../../transformers/groupByMovie', () => jest.fn(() => Promise.resolve([
  {}, {},
])));
const loadMarkusHtml = require('../../html-loaders/markus');
const getForumCinemasScreeningsFromHtml = require('../../screening-getters/forum-cinemas');
const groupByMovie = require('../../transformers/groupByMovie');

const date = new Date(2017, 0, 30);

describe('CcPlazaScraper', () => {
  afterEach(() => {
    loadMarkusHtml.mockClear();
    getForumCinemasScreeningsFromHtml.mockClear();
    groupByMovie.mockClear();
  });

  it('calls loadMarkusHtml with correct params', () =>
    CcPlazaScraper.scrapeForDate(date).then(() => {
      expect(loadMarkusHtml).toHaveBeenCalledWith('https://www.forumcinemas.ee', 1008, date);
    }));

  it('calls getForumCinemasScreeningsFromHtml with received HTML', () =>
    CcPlazaScraper.scrapeForDate(date).then(() => {
      expect(getForumCinemasScreeningsFromHtml).toHaveBeenCalledWith('HTML');
    }));

  it('calls groupByMovie with received screenings', () =>
    CcPlazaScraper.scrapeForDate(date).then(() => {
      expect(groupByMovie).toHaveBeenCalledWith([{}, {}, {}]);
    }));

  it('returns object with cinema alias', () =>
    CcPlazaScraper.scrapeForDate(date).then((obj) => {
      expect(obj.cinema).toBe('ccplaza');
    }));

  it('returns object with date', () =>
    CcPlazaScraper.scrapeForDate(date).then((obj) => {
      expect(obj.date).toBe(date);
    }));

  it('returns object with movies', () =>
    CcPlazaScraper.scrapeForDate(date).then((obj) => {
      expect(obj.movies).toEqual([{}, {}]);
    }));
});
