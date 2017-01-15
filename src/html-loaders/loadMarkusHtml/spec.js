const loadMarkusHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('Requested HTML')));
jest.mock('dateformat', () => () => '03.10.2017');
jest.mock('../loadHtml', () => jest.fn(() => Promise.resolve('Loaded HTML')));

const request = require('request-promise');
const loadHtml = require('../loadHtml');

describe('loadMarkusHtml', () => {
  afterEach(() => {
    request.mockClear();
    loadHtml.mockClear();
  });

  it('requests with correct payload', () =>
    loadMarkusHtml('https://cinema-url.com', 1234, new Date(2017, 9, 3)).then(() => {
      const expectedOptions = {
        headers,
        qs: {
          TheatreArea: 1234,
          dt: '03.10.2017',
        },
        url: 'https://cinema-url.com',
      };

      expect(request).toHaveBeenCalledWith(expectedOptions);
    }));

  it('calls loadHtml with html from request response', () =>
    loadMarkusHtml('https://cinema-url.com', 1234, new Date(2017, 9, 3)).then(() => {
      expect(loadHtml).toHaveBeenCalledWith('Requested HTML');
    }));

  it('returns loadHtml html', () => loadMarkusHtml('https://cinema-url.com', 1234, new Date(2017, 9, 3)).then((html) => {
    expect(html).toBe('Loaded HTML');
  }));
});
