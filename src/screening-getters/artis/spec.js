const getArtisScreeningsFromHtml = require('./');

const testHtml = require('./testHtml');

describe('getArtisScreeningsFromHtml', () => {
  it('gets correct number of screenings', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      expect(screenings).toHaveLength(5);
    })
  );

  it('gets screenings with title', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([
        'Järven tarina (EST)',
        'Elle',
        'Elle',
        'Kuudes kerta',
        'Fallen City',
      ]);
    })
  );

  it('gets screenings with year', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([null, null, null, null, null]);
    })
  );

  it('gets screenings with Estonian title', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Ühe järve lugu (EST)',
        'Elle',
        'Elle',
        'Kuues kord',
        'Kaotatud linn',
      ]);
    })
  );

  it('gets screenings with time', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 24, 11, 30),
        new Date(2017, 0, 24, 12),
        new Date(2017, 0, 24, 17, 15),
        new Date(2017, 0, 24, 13, 5),
        new Date(2017, 0, 24, 19, 30),
      ]);
    })
  );

  it('gets screenings with link', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'http://www.kino.ee/Websales/Show/113959/?dt=24.01.2017',
        'http://www.kino.ee/Websales/Show/114008/?dt=24.01.2017',
        'http://www.kino.ee/Websales/Show/114005/?dt=24.01.2017',
        'http://www.kino.ee/Websales/Show/114011/?dt=24.01.2017',
        'http://www.kino.ee/Websales/Show/113893/?dt=24.01.2017',
      ]);
    })
  );

  it('gets screenings with language', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual(['et', null, null, null, null]);
    })
  );

  it('gets screenings with dimensions', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([null, null, null, null, null]);
    })
  );

  it('gets screenings with imax', () =>
    getArtisScreeningsFromHtml(testHtml).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, false, false, false]);
    })
  );
});
