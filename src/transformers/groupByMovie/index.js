const groupByMovie = screenings => screenings.reduce((moviesWithScreenings, screening) => {
  const sameMovie = moviesWithScreenings.find(movie => movie.title === screening.title);

  if (sameMovie) {
    sameMovie.screenings.push({
      time: screening.time,
      link: screening.link,
      language: screening.language,
      dimensions: screening.dimensions,
      isImax: screening.isImax,
    });

    return [...moviesWithScreenings];
  }

  return [
    ...moviesWithScreenings,
    {
      title: screening.title,
      year: screening.year,
      estonianTitle: screening.estonianTitle,
      screenings: [
        {
          time: screening.time,
          link: screening.link,
          language: screening.language,
          dimensions: screening.dimensions,
          isImax: screening.isImax,
        },
      ],
    },
  ];
}, []);

module.exports = groupByMovie;
