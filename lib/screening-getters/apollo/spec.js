const getApolloScreeningsFromHtml = require('./');

const testHtml = require('./testHtml');

describe('getApolloScreeningsFromHtml', () => {
  it('gets correct number of screenings', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      expect(screenings).toHaveLength(8);
    })
  );

  it('gets screenings with title', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([
        'Снежная королева 3. Огонь и лед',
        'Снежная королева 3. Огонь и лед',
        'Moana',
        'Assassin\'s Creed',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
        'xXx: The Return of Xander Cage',
      ]);
    })
  );

  it('gets screenings with year', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([2016, 2016, 2016, 2016, 2017, 2017, 2017, 2017]);
    })
  );

  it('gets screenings with Estonian title', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Lumekuninganna 3: Tuli ja jää',
        'Lumekuninganna 3: Tuli ja jää',
        'Vaiana',
        'Assassin\'s Creed',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
        'xXx: Käima tõmmatud',
      ]);
    })
  );

  it('gets screenings with time', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 22, 10, 50),
        new Date(2017, 0, 22, 12, 15),
        new Date(2017, 0, 22, 13, 45),
        new Date(2017, 0, 22, 14, 10),
        new Date(2017, 0, 22, 15, 20),
        new Date(2017, 0, 22, 17, 40),
        new Date(2017, 0, 22, 20),
        new Date(2017, 0, 22, 22, 20),
      ]);
    })
  );

  it('gets screenings with link', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'https://www.apollokino.ee/Websales/Show/138574/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138596/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138586/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138602/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138570/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138571/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138572/?dt=22.01.2017',
        'https://www.apollokino.ee/Websales/Show/138573/?dt=22.01.2017',
      ]);
    })
  );

  it('gets screenings with language', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual([
        'et',
        'ru',
        'et',
        null,
        null,
        null,
        null,
        null,
      ]);
    })
  );

  it('gets screenings with dimensions', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([
        null,
        null,
        null,
        null,
        3,
        3,
        3,
        null,
      ]);
    })
  );

  it('gets screenings with imax', () =>
    getApolloScreeningsFromHtml(testHtml).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, false, false, false, false, false, false]);
    })
  );
});
