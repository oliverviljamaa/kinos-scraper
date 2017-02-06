const loadSoprusHtml = require('./');
const headers = require('../headers');

jest.mock('request-promise', () => jest.fn(() => Promise.resolve('HTML')));

const request = require('request-promise');

describe('loadSoprusHtml', () => {
  afterEach(() => {
    request.mockClear();
  });

  it('requests with correct payload', () =>
    loadSoprusHtml().then(() => {
      const expectedOptions = {
        headers,
        url: 'http://kinosoprus.ee',
      };

      expect(request).toHaveBeenCalledWith(expectedOptions);
    }));

  it('returns html', () => loadSoprusHtml().then((html) => {
    expect(html).toBe('HTML');
  }));
});
