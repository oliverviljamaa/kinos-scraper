const loadKosmosHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('HTML')));
const request = require('request-promise');

describe('loadKosmosHtml', () => {
  afterEach(() => {
    request.mockClear();
  });

  it('requests with correct payload', () =>
    loadKosmosHtml().then(() => {
      expect(request).toHaveBeenCalledWith({
        url: 'https://kinokosmos.ee/kinokava',
        headers,
      });
    }));

  it('returns html', () =>
    loadKosmosHtml().then((html) => {
      expect(html).toBe('HTML');
    }));
});
