const getSoprusScreeningsFromHtmlForDate = require('./');

const testHtml = require('./testHtml');

const date = new Date(2017, 0, 26);

describe('getSoprusScreeningsFromHtmlForDate', () => {
  it('gets correct number of screenings', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      expect(screenings).toHaveLength(3);
    }),
  );

  it('gets screenings with title', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([null, null, null]);
    }),
  );

  it('gets screenings with year', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([2016, 2016, 2016]);
    }),
  );

  it('gets screenings with Estonian title', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Kahe maailma kokkupõrge',
        'Inimene kaamera taga',
        '21 x New York',
      ]);
    }),
  );

  it('gets screenings with time', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 26, 15),
        new Date(2017, 0, 26, 18, 30),
        new Date(2017, 0, 26, 20, 30),
      ]);
    }),
  );

  it('gets screenings with link', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'http://kinosoprus.ee//et/film/klassiga-kinno-kahe-maailma-kokkuporge',
        'http://kinosoprus.ee//et/movie/inimene-kaamera-taga',
        'http://kinosoprus.ee//et/movie/21-x-new-york',
      ]);
    }),
  );

  it('gets screenings with language', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual([null, null, null]);
    }),
  );

  it('gets screenings with dimensions', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([null, null, null]);
    }),
  );

  it('gets screenings with imax', () =>
    getSoprusScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, false]);
    }),
  );
});
