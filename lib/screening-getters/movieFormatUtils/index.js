const lowerCaseIncludes = (haystack, needle) => haystack.toLowerCase().includes(needle);

const isEstonian = string => lowerCaseIncludes(string, 'eesti k');
const isRussian = string => lowerCaseIncludes(string, 'vene k');
const isEnglish = string => lowerCaseIncludes(string, 'inglise k');
const is3d = string => lowerCaseIncludes(string, '3d');
const is5d = string => lowerCaseIncludes(string, '5d');
const isImax = string => lowerCaseIncludes(string, 'imax');

const getLanguage = (string) => {
  if (isEstonian(string)) return 'et';
  if (isRussian(string)) return 'ru';
  if (isEnglish(string)) return 'en';

  return null;
};

const getDimensions = (string) => {
  if (is3d(string)) return 3;
  if (is5d(string)) return 5;

  return null;
};

const getIfIsImax = isImax;

module.exports = { getLanguage, getDimensions, getIfIsImax };
