const getKosmosScreeningsFromHtmlForDate = require('./');

const testHtml = require('./testHtml');

const date = new Date(2017, 0, 26);

describe('getKosmosScreeningsFromHtmlForDate', () => {
  it('gets correct number of screenings', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      expect(screenings).toHaveLength(7);
    })
  );

  it('gets screenings with title', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([
        'Ballerina',
        'Ballerina',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
        'Викинг',
        'Викинг',
      ]);
    })
  );

  it('gets screenings with year', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([null, null, null, null, null, null, null]);
    })
  );

  it('gets screenings with Estonian title', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Baleriin',
        'Baleriin',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
        'Viiking',
        'Viiking',
      ]);
    })
  );

  it('gets screenings with time', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 26, 13, 10),
        new Date(2017, 0, 26, 15, 15),
        new Date(2017, 0, 26, 13, 30),
        new Date(2017, 0, 26, 16),
        new Date(2017, 0, 26, 21, 45),
        new Date(2017, 0, 26, 16),
        new Date(2017, 0, 26, 19, 45),
      ]);
    })
  );

  it('gets screenings with link', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'https://kinokosmos.ee/piletid/?sessionId=13548',
        'https://kinokosmos.ee/piletid/?sessionId=13549',
        'https://kinokosmos.ee/piletid/?sessionId=13557',
        'https://kinokosmos.ee/piletid/?sessionId=13558',
        'https://kinokosmos.ee/piletid/?sessionId=13559',
        'https://kinokosmos.ee/piletid/?sessionId=13554',
        'https://kinokosmos.ee/piletid/?sessionId=13551',
      ]);
    })
  );

  it('gets screenings with language', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual(['et', 'et', null, null, null, 'ru', 'ru']);
    })
  );

  it('gets screenings with dimensions', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([null, null, 3, 3, 3, null, null]);
    })
  );

  it('gets screenings with imax', () =>
    getKosmosScreeningsFromHtmlForDate(testHtml, date).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, true, true, true, false, false]);
    })
  );
});
