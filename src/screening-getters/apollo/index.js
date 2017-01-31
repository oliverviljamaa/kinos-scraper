const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { getLanguage, getDimensions } = require('../movieFormatUtils');
const { findAll, removeUnnecessarySpaces, removeParentheses } = require('../utils');


const getMovieNodesFromDocument = document => findAll(document, '.panel-EventBlock');

const getSelectedDate = node => node.querySelector('select[name=dt] option[selected=selected]').value;

const getEstonianTitleWithFormatNode = node => node.querySelector('.list-item-desc-title > a');

const getEstonianTitleFromNode = node => removeUnnecessarySpaces(node.firstChild.textContent);

const getTitleWithYearNode = node => node.querySelector('.list-item-desc-title > small');

const getTitleFromNode =
  node => node.childNodes.length > 1 // eslint-disable-line no-confusing-arrow
    ? removeUnnecessarySpaces(node.firstChild.textContent)
    : null;

const getYearFromNode = node => parseInt(removeParentheses(removeUnnecessarySpaces(
  node.querySelector('.productionYear').textContent
)), 10);

const getLanguageFromNode =
  node => node.childNodes.length > 1 // eslint-disable-line no-confusing-arrow
    ? getLanguage(removeUnnecessarySpaces(node.childNodes[2].textContent))
    : null;

const getDimensionsFromNode =
  node => node.childNodes.length > 1 // eslint-disable-line no-confusing-arrow
    ? getDimensions(removeUnnecessarySpaces(node.childNodes[2].textContent))
    : null;

const getMovieScreeningNodes = node => findAll(node, 'a.btn');

const getTimeForDocumentFromNode = (document, node) => moment(
  `${getSelectedDate(document)} ${removeUnnecessarySpaces(node.textContent)}`,
  'DD.MM.YYYY HH:mm'
).toDate();

const getLinkFromNode = node => node.href;

const getScreeningsFromDocument = document =>
  getMovieNodesFromDocument(document)
    .reduce((screenings, movieNode) => {
      const estonianTitleWithFormatNode = getEstonianTitleWithFormatNode(movieNode);
      const estonianTitle = getEstonianTitleFromNode(estonianTitleWithFormatNode);
      const language = getLanguageFromNode(estonianTitleWithFormatNode);
      const dimensions = getDimensionsFromNode(estonianTitleWithFormatNode);

      const titleWithYearNode = getTitleWithYearNode(movieNode);
      const title = getTitleFromNode(titleWithYearNode) || estonianTitle;
      const year = getYearFromNode(titleWithYearNode);

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

const getApolloScreeningsFromHtml = html =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(getScreeningsFromDocument)
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getApolloScreeningsFromHtml;
