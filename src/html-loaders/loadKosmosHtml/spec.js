const loadKosmosHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('Requested HTML')));
jest.mock('../loadHtml', () => jest.fn(() => Promise.resolve('Loaded HTML')));

const request = require('request-promise');
const loadHtml = require('../loadHtml');

describe('loadKosmosHtml', () => {
  afterEach(() => {
    request.mockClear();
    loadHtml.mockClear();
  });

  it('requests with correct payload', () =>
    loadKosmosHtml().then(() => {
      expect(request).toHaveBeenCalledWith({
        url: 'https://kinokosmos.ee/kinokava',
        headers,
      });
    }));

  it('calls loadHtml with html from request response', () =>
    loadKosmosHtml().then(() => {
      expect(loadHtml).toHaveBeenCalledWith('Requested HTML');
    }));

  it('returns loadHtml html', () =>
    loadKosmosHtml().then((html) => {
      expect(html).toBe('Loaded HTML');
    }));
});
