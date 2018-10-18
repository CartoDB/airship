import colorMapFactory from './colorMap.factory';

describe('data-processor', () => {
  describe('.create', () => {
    it('should return a colorMap with interpolated colors when no defined in metadata', () => {
      const actual = colorMapFactory.create(['key0', 'key1'], {});
      const expected = {
        key0: 'rgb(158, 1, 66)',
        key1: 'rgb(251, 248, 176)',
      };

      expect(actual).toEqual(expected);
    });

    it('should return a colorMap with the colors defined in metadata', () => {
      const metadata = {
        key0: {
          color: 'red',
          label: 'key0',
        },
        key1: {
          color: 'blue',
          label: 'key1',
        }
      };
      const actual = colorMapFactory.create(['key0', 'key1'], metadata);
      const expected = {
        key0: 'red',
        key1: 'blue',
      };

      expect(actual).toEqual(expected);
    });
  });
});
