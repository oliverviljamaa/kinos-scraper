const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { findAll, removeUnnecessarySpaces } = require('../utils');
const { getLanguage } = require('../movieFormatUtils');


const getMovieNodesFromDocument = document => findAll(document, '.eventListItem');

const getEstonianTitleNode = node => node.querySelector('.title-big');

const getEstonianTitle = node => removeUnnecessarySpaces(getEstonianTitleNode(node).textContent);

const getTitleNode = node => node.querySelector('.title-original');

const getTitle = node => removeUnnecessarySpaces(getTitleNode(node).childNodes[2].textContent);

const hasSubtitles = node => !!node.querySelector('.subs');

const getAudioLanguageNode = node => node.querySelector('.language');

const getLanguageFromNode = node => hasSubtitles(node) // eslint-disable-line no-confusing-arrow
  ? null
  : getLanguage(getAudioLanguageNode(node).textContent);

const getMovieScreeningNodes = node => findAll(node, '.ajad a');

const getSelectedDate = node => node.querySelector('select[name=dt] option[selected=selected]').value;

const getTimeForDocumentFromNode = (document, node) => moment(
  `${getSelectedDate(document)} ${removeUnnecessarySpaces(node.textContent)}`,
  'DD.MM.YYYY HH:mm'
).toDate();

const getLinkFromNode = node => `http://www.kino.ee${node.href}`;

const getScreeningsFromDocument = document =>
  getMovieNodesFromDocument(document).reduce((screenings, movieNode) => {
    const title = getTitle(movieNode);
    const estonianTitle = getEstonianTitle(movieNode);
    const language = getLanguageFromNode(movieNode);

    const year = null;
    const dimensions = null;
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

const getArtisScreeningsFromHtml = html =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(getScreeningsFromDocument)
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getArtisScreeningsFromHtml;
