import dataProcessor from './data-processor';

describe('data-processor', () => {
  let FAKE_DATA;
  beforeEach(() => {
    FAKE_DATA = [{
      category: 'A New Hope',
      values: {
        investment: 10,
        revenue: 10
      }
    },
    {
      category: 'The Empire Strikes Back',
      values: {
        investment: 5,
        revenue: 6
      }
    },
    {
      category: 'The Empire Strikes Back',
      values: {
        complements: 7,
        revenue: 6
      }
    }
    ];
  });

  describe('.getDomain', () => {
    it('should return the biggest sum as the upper bound ', () => {
      const actual = dataProcessor.getDomain(FAKE_DATA)[1];
      const expected = 20;

      expect(actual).toEqual(expected);
    });

    it('should return zero as the lower bound when there is no negative values', () => {
      const actual = dataProcessor.getDomain(FAKE_DATA)[0];
      const expected = 0;

      expect(actual).toEqual(expected);
    });

    it('should return the smallest sum as the lower bound', () => {
      FAKE_DATA.push({
        category: 'A big failure',
        values: {
          investiment: -10,
          revenue: -10,
        }
      });
      const actual = dataProcessor.getDomain(FAKE_DATA)[0];
      const expected = -20;

      expect(actual).toEqual(expected);
    });

    it('should return the smallest sum as the lower bound', () => {
      FAKE_DATA.push({
        category: 'A big failure',
        values: {
          investiment: -10,
          revenue: 5,
        }
      });
      const actual = dataProcessor.getDomain(FAKE_DATA)[0];
      const expected = -10;

      expect(actual).toEqual(expected);
    });
  });

  describe('.rawDataToStackBarData', () => {
    it('should transform the raw data into ColumnData', () => {
      const colorMap = {
        complements: 'grey',
        investment: 'red',
        revenue: 'green',
      };
      const actual = dataProcessor.rawDataToStackBarData(FAKE_DATA, dataProcessor.getDomain(FAKE_DATA), colorMap);
      const expected = [
        [
          {
            color: 'red',
            negative: false,
            size: 50,
            value: 10,
          },
          {
            color: 'green',
            negative: false,
            size: 50,
            value: 10,
          },
        ],
        [
          {
            color: 'red',
            negative: false,
            size: 25,
            value: 5,
          },
          {
            color: 'green',
            negative: false,
            size: 30,
            value: 6,
          },
        ],
        [
          {
            color: 'grey',
            negative: false,
            size: 35,
            value: 7,
          },
          {
            color: 'green',
            negative: false,
            size: 30,
            value: 6,
          },
        ]
      ];
      expect(actual).toEqual(expected);
    });
  });
});





