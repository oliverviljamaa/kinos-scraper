const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { findAll, removeUnnecessarySpaces, removeParentheses } = require('../utils');
const { getLanguage, getDimensions } = require('../movieFormatUtils');


const getMovieNodesFromDocument = document => findAll(document, '.table-movies-row');

const getEstonianTitleAndFormat = node => removeUnnecessarySpaces(
  node.querySelector('.movies-desc-title a').textContent,
);

const isFormatInfo = string => string.includes('keeles')
  || string.includes('3D')
  || string.includes('5D');

const splitTitleAndFormatInfo = (string) => {
  const regex = /\(.*?\)/g;
  const parenthesesGroups = string.match(regex);

  let title = string;
  let formatInfo = null;

  if (parenthesesGroups) {
    formatInfo = parenthesesGroups.find(isFormatInfo);
    title = formatInfo ? string.replace(/\(.*?\)/g, '') : string;
  }

  return [removeUnnecessarySpaces(title), formatInfo];
};

const getLanguageFromFormat = format => // eslint-disable-line no-confusing-arrow
  format ? getLanguage(format) : null;

const getDimensionsFromFormat = format => // eslint-disable-line no-confusing-arrow
  format ? getDimensions(format) : null;

const getTitleAndYear = node => removeUnnecessarySpaces(
  node.querySelector('.movies-desc-alt-title a').textContent,
);

const splitTitleAndYear = (string) => {
  const regex = /\(.*?\)/g;
  const parenthesesGroups = string.match(regex);

  let title = string;
  let year = null;

  if (parenthesesGroups) {
    year = parenthesesGroups[0];
    title = year ? string.replace(/\(.*?\)/g, '') : string;
  }

  return [removeUnnecessarySpaces(title), parseInt(removeParentheses(year), 10)];
};

const getMovieScreeningNodes = node => findAll(node, '.shows-item a');

const getSelectedDate = node => node.querySelector('select[name=dt] option[selected=selected]').value;

const getTimeForDocumentFromNode = (document, node) => moment(
  `${getSelectedDate(document)} ${removeUnnecessarySpaces(node.textContent)}`,
  'DD.MM.YYYY HH:mm',
).toDate();

const getLinkFromNode = node => `http://www.viimsikino.ee${node.href}`;

const getScreeningsFromDocument = document =>
  getMovieNodesFromDocument(document).reduce((screenings, movieNode) => {
    const estonianTitleAndFormat = getEstonianTitleAndFormat(movieNode);
    const [estonianTitle, format] = splitTitleAndFormatInfo(estonianTitleAndFormat);
    const language = getLanguageFromFormat(format);
    const dimensions = getDimensionsFromFormat(format);

    const titleAndYear = getTitleAndYear(movieNode);
    const [title, year] = splitTitleAndYear(titleAndYear);

    const isImax = false;

    const movieScreenings = getMovieScreeningNodes(movieNode).map(node => ({
      title,
      year,
      estonianTitle,
      time: getTimeForDocumentFromNode(document, node),
      link: getLinkFromNode(node),
      language,
      dimensions,
      isImax,
    }));

    return [
      ...screenings,
      ...movieScreenings,
    ];
  }, []);

const getViimsiScreeningsFromHtml = html =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(getScreeningsFromDocument)
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getViimsiScreeningsFromHtml;
