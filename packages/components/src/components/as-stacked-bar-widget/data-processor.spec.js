import dataProcessor from './data-processor';

describe('data-processor', () => {
  let FAKE_DATA;
  beforeEach(() => {
    FAKE_DATA = [{
        category: 'A New Hope',
        values: {
          investment: 204338075,
          revenue: 359029623
        }
      },
      {
        category: 'The Empire Strikes Back',
        values: {
          investment: 369029623,
          revenue: 236513856
        }
      }
    ];
  });

  describe('.getDomain', () => {
    it('should return the biggest value in the data as the higher bound ', () => {
      const actual = dataProcessor.getDomain(FAKE_DATA)[1]
      const expected = 369029623;

      expect(actual).toEqual(expected);
    });

    it('should return zero as the lower bound when the smallest data value is bigger than zero', () => {
      const actual = dataProcessor.getDomain(FAKE_DATA)[0];
      const expected = 0;

      expect(actual).toEqual(expected);
    });

    it('should return the smallest value in the data as the lower bound when the value is smaller than zero', () => {
      FAKE_DATA.push({
        category: 'A big failure',
        values: {
          investiment: 1000000,
          revenue: -1000000,
        }
      })
      const actual = dataProcessor.getDomain(FAKE_DATA)[0];
      const expected = -1000000;

      expect(actual).toEqual(expected);
    });
  });
});
