const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { findAll, removeUnnecessarySpaces } = require('../utils');
const { getLanguage, getDimensions, getIfIsImax } = require('../movieFormatUtils');


const createDateString = date => moment(date).format('YYYY-MM-DD');

const extractHtmlFromDocumentForDate = (document, date) =>
  document.querySelector(`#acc${createDateString(date)}`);

const getMovieNodesFromHtml = html => findAll(html, '.film-now-showing');

const getEstonianTitleWithFormat = node => node.querySelector('h3 a').textContent;

const cleanTitleFromFormatAndSpaces = title => removeUnnecessarySpaces(
  title.replace(' 3D', '').replace(' IMAX', '')
);

const getTitleWithFormat = node => node.querySelector('.originaltitle').textContent;

const getMovieScreeningNodes = node => findAll(node, '.session-item');

const getSelectedDate = html => html.id.substring(3);

const getTimeForHtmlFromNode = (html, node) => moment(
  `${getSelectedDate(html)} ${removeUnnecessarySpaces(node.querySelector('.time-wrap').textContent)}`,
  'YYYY-MM-DD HH:mm'
).toDate();

const getLinkFromNode = node => node.querySelector('.time-wrap').href;

const getLanguageFromNode = node => getLanguage(
  node.querySelector('.attributes').textContent
);

const getScreeningsFromHtml = html =>
  getMovieNodesFromHtml(html).reduce((screenings, movieNode) => {
    const estonianTitleWithFormat = getEstonianTitleWithFormat(movieNode);
    const estonianTitle = cleanTitleFromFormatAndSpaces(estonianTitleWithFormat);
    const dimensions = getDimensions(estonianTitleWithFormat);
    const isImax = getIfIsImax(estonianTitleWithFormat);

    const titleWithFormat = getTitleWithFormat(movieNode);
    const title = cleanTitleFromFormatAndSpaces(titleWithFormat);

    const year = null;

    const movieScreenings = getMovieScreeningNodes(movieNode).map(node => ({
      title,
      year,
      estonianTitle,
      time: getTimeForHtmlFromNode(html, node),
      link: getLinkFromNode(node),
      language: getLanguageFromNode(node),
      dimensions,
      isImax,
    }));

    return [
      ...screenings,
      ...movieScreenings,
    ];
  }, []);

const getKosmosScreeningsFromHtmlForDate = (html, date) =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(document => extractHtmlFromDocumentForDate(document, date))
    .then(getScreeningsFromHtml)
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getKosmosScreeningsFromHtmlForDate;
