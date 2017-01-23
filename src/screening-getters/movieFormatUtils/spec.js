const { getLanguage, getDimensions, getIfIsImax } = require('./');

describe('movieFormatUtils', () => {
  describe('getLanguage', () => {
    it('returns Estonian language code if is Estonian', () => {
      expect(getLanguage('3D, Eesti keeles')).toBe('et');
    });

    it('returns Russian language code if is Russian', () => {
      expect(getLanguage('IMAX, vene k.')).toBe('ru');
    });

    it('returns English language code if is English', () => {
      expect(getLanguage('Inglise keeles')).toBe('en');
    });

    it('returns null if no language info', () => {
      expect(getLanguage('3D')).toBeNull();
    });
  });

  describe('getDimensions', () => {
    it('returns 3 if is 3D', () => {
      expect(getDimensions('3d')).toBe(3);
    });

    it('returns 5 if is 5D', () => {
      expect(getDimensions('5D')).toBe(5);
    });

    it('returns null if no dimensions info', () => {
      expect(getDimensions('Vene keeles')).toBeNull();
    });
  });

  describe('getIfIsImax', () => {
    it('returns true if is IMAX', () => {
      expect(getIfIsImax('imax')).toBe(true);
    });

    it('returns false if is not', () => {
      expect(getIfIsImax('3D, Inglise keeles')).toBe(false);
    });
  });
});
