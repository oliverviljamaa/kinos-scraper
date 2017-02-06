const findAll = (element, query) => [].slice.call(element.querySelectorAll(query));

const removeUnnecessarySpaces = string => string.replace(/\s+/g, ' ').trim();

const removeParentheses = string => string.replace(/\(|\)/g, '');

module.exports = {
  findAll,
  removeUnnecessarySpaces,
  removeParentheses,
};
