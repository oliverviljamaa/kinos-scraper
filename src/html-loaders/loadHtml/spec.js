const loadHtml = require('./');

jest.mock('cheerio', () => ({
  load: jest.fn(() => Promise.resolve('Cheerio HTML')),
}));

describe('loadHtml', () => {
  it('loads html with cheerio', () => loadHtml('<div>HTML</div>').then((html) => {
    expect(html).toBe('Cheerio HTML');
  }));
});
