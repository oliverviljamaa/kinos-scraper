const Promise = require('bluebird');
const jsdom = Promise.promisifyAll(require('jsdom'));
const moment = require('moment');

const { findAll, removeUnnecessarySpaces } = require('../utils');


const createDateString = date => moment(date).format('DD/MM');

const extractSectionFromDocumentForDate = (document, date) =>
  findAll(document, 'thead')
    .find(elem => elem.textContent.includes(createDateString(date)))
    .nextElementSibling;

const getMovieNodesFromHtml = html => findAll(html, 'tr');

const removeQuotesFromString = string => string.replace(/[«»]/g, '');

const removeCampaigns = string => string.replace('Klassiga kinno: ', '');

const getEstonianTitle = node => removeCampaigns(removeUnnecessarySpaces(removeQuotesFromString(
  node.querySelector('a').textContent
)));

const getYear = node => parseInt(removeUnnecessarySpaces(
  [...node.querySelector('.meta').textContent.split('/')].pop()
), 10);

const getLinkFromNode = node => `http://kinosoprus.ee/${node.querySelector('a').href}`;

const getHoursAndMinutesFromNode = node => removeUnnecessarySpaces(
  node.querySelector('.date-display-single').textContent
).split(':');

const getTimeFromNodeForDate = (node, date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    ...getHoursAndMinutesFromNode(node)
  );

const getScreeningsFromHtmlForDate = (html, date) =>
  getMovieNodesFromHtml(html).reduce((screenings, movieNode) => {
    const estonianTitle = getEstonianTitle(movieNode);
    const year = getYear(movieNode);

    const title = null;
    const language = null;
    const dimensions = null;
    const isImax = false;

    return [
      ...screenings,
      {
        title,
        year,
        estonianTitle,
        time: getTimeFromNodeForDate(movieNode, date),
        link: getLinkFromNode(movieNode),
        language,
        dimensions,
        isImax,
      },
    ];
  }, []);

const getSoprusScreeningsFromHtmlForDate = (html, date) =>
  jsdom
    .envAsync(html)
    .then(window => window.document)
    .then(document => extractSectionFromDocumentForDate(document, date))
    .then(section => getScreeningsFromHtmlForDate(section, date))
    .catch((err) => {
      throw new Error(err);
    });

module.exports = getSoprusScreeningsFromHtmlForDate;
