const { findAll, removeUnnecessarySpaces, removeParentheses } = require('./');

describe('utils', () => {
  describe('findAll', () => {
    it('returns array of elements matching the query', () => {
      document.body.innerHTML = `
        <div>
          <span class="match"></span>
          <div class="match"></div>
          <span></span>
        </div>
      `;

      expect(findAll(document.body, '.match')).toHaveLength(2);
    });
  });

  describe('removeUnnecessarySpaces', () => {
    it('replaces all multiple spaces with one', () => {
      expect(
        removeUnnecessarySpaces(
          `  Eesti
          keeles `,
        ),
      ).toBe('Eesti keeles');
    });
  });

  describe('removeParentheses', () => {
    it('removes parentheses', () => {
      expect(removeParentheses('(2017)')).toBe('2017');
    });
  });
});
