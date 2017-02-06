const groupByMovie = require('./');
const screenings = require('./screenings');

const moviesWithScreenings = groupByMovie(screenings);

describe('groupByMovie', () => {
  it('returns unique movies', () => {
    expect(moviesWithScreenings).toHaveLength(3);
  });

  it('returns movies with title', () => {
    const titles = moviesWithScreenings.map(movie => movie.title);

    expect(titles).toEqual(['Ballerina', 'Sing', 'Why Him?']);
  });

  it('returns movies with year', () => {
    const years = moviesWithScreenings.map(movie => movie.year);

    expect(years).toEqual([2016, 2016, 2016]);
  });

  it('returns movies with Estonian title', () => {
    const estonianTitles = moviesWithScreenings.map(movie => movie.estonianTitle);

    expect(estonianTitles).toEqual(['Baleriin', 'Laula', 'Miks just tema?']);
  });

  it('returns screenings for movies with time', () => {
    const times = moviesWithScreenings.map(
      movie => movie.screenings.map(screening => screening.time)
    );

    expect(times).toEqual([
      [new Date(2017, 1, 7, 9), new Date(2017, 1, 7, 9, 10), new Date(2017, 1, 7, 13, 40)],
      [new Date(2017, 1, 7, 11, 15), new Date(2017, 1, 7, 13, 10)],
      [new Date(2017, 1, 7, 12, 10)],
    ]);
  });

  it('returns screenings for movies with link', () => {
    const links = moviesWithScreenings.map(
      movie => movie.screenings.map(screening => screening.link)
    );

    expect(links).toEqual([
      [
        'https://www.apollokino.ee/Websales/Show/140075/?dt=07.02.2017',
        'https://www.apollokino.ee/Websales/Show/140226/?dt=07.02.2017',
        'https://www.apollokino.ee/Websales/Show/140228/?dt=07.02.2017',
      ],
      [
        'https://www.apollokino.ee/Websales/Show/140014/?dt=07.02.2017',
        'https://www.apollokino.ee/Websales/Show/140020/?dt=07.02.2017',
      ],
      [
        'https://www.apollokino.ee/Websales/Show/140040/?dt=07.02.2017',
      ],
    ]);
  });

  it('returns screenings for movies with language', () => {
    const languages = moviesWithScreenings.map(
      movie => movie.screenings.map(screening => screening.language)
    );

    expect(languages).toEqual([
      ['ru', 'et', 'et'],
      ['et', 'et'],
      [null],
    ]);
  });

  it('returns screenings for movies with dimensions', () => {
    const dimensions = moviesWithScreenings.map(
      movie => movie.screenings.map(screening => screening.dimensions)
    );

    expect(dimensions).toEqual([
      [null, null, null],
      [3, null],
      [null],
    ]);
  });

  it('returns screenings for movies with if is imax', () => {
    const isImaxes = moviesWithScreenings.map(
      movie => movie.screenings.map(screening => screening.isImax)
    );

    expect(isImaxes).toEqual([
      [false, false, false],
      [false, false],
      [false],
    ]);
  });
});
