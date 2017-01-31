const loadMarkusHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('HTML')));

const request = require('request-promise');

describe('loadMarkusHtml', () => {
  afterEach(() => {
    request.mockClear();
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

  it('returns html', () => loadMarkusHtml('https://cinema-url.com', 1234, new Date(2017, 9, 3)).then((html) => {
    expect(html).toBe('HTML');
  }));
});
