const getViimsiScreeningsFromHtml = require('./');

const testHtml = require('./testHtml');

describe('getViimsiScreeningsFromHtml', () => {
  it('gets correct number of screenings', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      expect(screenings).toHaveLength(7);
    })
  );

  it('gets screenings with title', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([
        'Järven tarina',
        'Lottele külla',
        'Lottele külla',
        'Lottele külla',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
        'American Pastoral',
      ]);
    })
  );

  it('gets screenings with year', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([2016, 2015, 2015, 2015, 2016, 2016, 2016]);
    })
  );

  it('gets screenings with Estonian title', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Ühe järve lugu',
        'Lottele külla',
        'Lottele külla',
        'Lottele külla',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
        'Ameerika pastoraal',
      ]);
    })
  );

  it('gets screenings with time', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 24, 12, 30),
        new Date(2017, 0, 24, 13, 30),
        new Date(2017, 0, 24, 14, 20),
        new Date(2017, 0, 24, 16, 10),
        new Date(2017, 0, 24, 14, 15),
        new Date(2017, 0, 24, 19, 10),
        new Date(2017, 0, 24, 21, 55),
      ]);
    })
  );

  it('gets screenings with link', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'http://www.viimsikino.ee/Websales/Show/139586/',
        'http://www.viimsikino.ee/Websales/Show/139593/',
        'http://www.viimsikino.ee/Websales/Show/139598/',
        'http://www.viimsikino.ee/Websales/Show/139607/',
        'http://www.viimsikino.ee/Websales/Show/139597/',
        'http://www.viimsikino.ee/Websales/Show/139616/',
        'http://www.viimsikino.ee/Websales/Show/139609/',
      ]);
    })
  );

  it('gets screenings with language', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual(['et', null, null, null, null, null, null]);
    })
  );

  it('gets screenings with dimensions', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([null, 5, 5, 5, 3, 3, null]);
    })
  );

  it('gets screenings with imax', () =>
    getViimsiScreeningsFromHtml(testHtml).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, false, false, false, false, false]);
    })
  );
});
