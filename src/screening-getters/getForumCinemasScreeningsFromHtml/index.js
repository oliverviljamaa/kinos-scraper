const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { findAll, removeUnnecessarySpaces } = require('../utils');
const { getLanguage, getDimensions } = require('../movieFormatUtils');

const getMovieNodesFromDocument = document => findAll(document, '.result');

const getFormatNode = node => node.querySelector('.result_h4').parentNode;

const getLanguageFromNode =
  node => node.childNodes.length > 2 // eslint-disable-line no-confusing-arrow
    ? getLanguage(removeUnnecessarySpaces(node.childNodes[2].textContent))
    : null;

const getDimensionsFromNode =
  node => node.childNodes.length > 2 // eslint-disable-line no-confusing-arrow
    ? getDimensions(removeUnnecessarySpaces(node.childNodes[2].textContent))
    : null;

const getTitleNode = node => node.querySelector('.result_h4').parentNode.nextElementSibling;

const getMovieScreeningNodes = node => findAll(node, '.showTime a');

const getSelectedDate = node => node.querySelector('select[name=dt] option[selected=selected]').value;

const getTimeForDocumentFromNode = (document, node) => moment(
  `${getSelectedDate(document)} ${removeUnnecessarySpaces(node.textContent)}`,
  'DD.MM.YYYY HH:mm'
).toDate();

const getLinkFromNode = node => node.href;

const getScreeningsFromDocument = document =>
  getMovieNodesFromDocument(document).reduce((screenings, movieNode) => {
    const estonianTitle = removeUnnecessarySpaces(
      movieNode.querySelector('.result_h4').textContent
    );

    const formatNode = getFormatNode(movieNode);
    const language = getLanguageFromNode(formatNode);
    const dimensions = getDimensionsFromNode(formatNode);

    const titleNode = getTitleNode(movieNode);
    const title = removeUnnecessarySpaces(titleNode.textContent);

    const year = null;
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

const getForumCinemasScreeningsFromHtml = html =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(getScreeningsFromDocument)
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getForumCinemasScreeningsFromHtml;
