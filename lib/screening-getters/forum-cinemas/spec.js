const getForumCinemasScreeningsFromHtml = require('./');

const testHtml = require('./testHtml');

describe('getForumCinemasScreeningsFromHtml', () => {
  it('gets correct number of screenings', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      expect(screenings).toHaveLength(5);
    })
  );

  it('gets screenings with title', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const titles = screenings.map(screening => screening.title);

      expect(titles).toEqual([
        'Три богатыря и Морской царь',
        'Три богатыря и Морской царь',
        'Bodom',
        'Три богатыря и Морской царь',
        "Assassin's Creed",
      ]);
    })
  );

  it('gets screenings with year', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const years = screenings.map(screening => screening.year);

      expect(years).toEqual([null, null, null, null, null]);
    })
  );

  it('gets screenings with Estonian title', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const estonianTitles = screenings.map(screening => screening.estonianTitle);

      expect(estonianTitles).toEqual([
        'Kolm vägilast ja merekuningas',
        'Kolm vägilast ja merekuningas',
        'Bodom',
        'Kolm vägilast ja merekuningas',
        "Assassin's Creed",
      ]);
    })
  );

  it('gets screenings with time', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const times = screenings.map(screening => screening.time);

      expect(times).toEqual([
        new Date(2017, 0, 23, 11, 15),
        new Date(2017, 0, 23, 17),
        new Date(2017, 0, 23, 11, 35),
        new Date(2017, 0, 23, 13, 35),
        new Date(2017, 0, 23, 14, 45),
      ]);
    })
  );

  it('gets screenings with link', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const links = screenings.map(screening => screening.link);

      expect(links).toEqual([
        'https://www.forumcinemas.ee/Websales/Show/284525/',
        'https://www.forumcinemas.ee/Websales/Show/284526/',
        'https://www.forumcinemas.ee/Websales/Show/284478/',
        'https://www.forumcinemas.ee/Websales/Show/284522/',
        'https://www.forumcinemas.ee/Websales/Show/284514/',
      ]);
    })
  );

  it('gets screenings with language', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const languages = screenings.map(screening => screening.language);

      expect(languages).toEqual(['ru', 'ru', null, 'et', null]);
    })
  );

  it('gets screenings with dimensions', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const dimensions = screenings.map(screening => screening.dimensions);

      expect(dimensions).toEqual([null, null, null, null, 3]);
    })
  );

  it('gets screenings with imax', () =>
    getForumCinemasScreeningsFromHtml(testHtml).then((screenings) => {
      const imaxes = screenings.map(screening => screening.isImax);

      expect(imaxes).toEqual([false, false, false, false, false]);
    })
  );
});
