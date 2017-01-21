const loadSoprusHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('Requested HTML')));
jest.mock('../loadHtml', () => jest.fn(() => Promise.resolve('Loaded HTML')));

const request = require('request-promise');
const loadHtml = require('../loadHtml');

describe('loadSoprusHtml', () => {
  afterEach(() => {
    request.mockClear();
    loadHtml.mockClear();
  });

  it('requests with correct payload', () =>
    loadSoprusHtml().then(() => {
      const expectedOptions = {
        headers,
        url: 'http://kinosoprus.ee',
      };

      expect(request).toHaveBeenCalledWith(expectedOptions);
    }));

  it('calls loadHtml with html from request response', () =>
    loadSoprusHtml().then(() => {
      expect(loadHtml).toHaveBeenCalledWith('Requested HTML');
    }));

  it('returns loadHtml html', () => loadSoprusHtml().then((html) => {
    expect(html).toBe('Loaded HTML');
  }));
});
