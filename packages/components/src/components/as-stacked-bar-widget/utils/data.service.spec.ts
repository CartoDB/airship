import dataProcessor from './data.service';

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
      const scale = dataProcessor.getDomain(FAKE_DATA);
      const actual = dataProcessor.rawDataToStackBarData(FAKE_DATA, scale, colorMap, 20, 5);
      const expected =
        [
          [
            {
              c: 'red',
              h: 50,
              v: 10,
              w: 20,
              x: 2.5,
              y: 50,
            },
            {
              c: 'green',
              h: 50,
              v: 10,
              w: 20,
              x: 2.5,
              y: 0,
            },
          ],
          [
            {
              c: 'red',
              h: 25,
              v: 5,
              w: 20,
              x: 27.5,
              y: 75,
            },
            {
              c: 'green',
              h: 30,
              v: 6,
              w: 20,
              x: 27.5,
              y: 45,
            },
          ],
          [
            {
              c: 'grey',
              h: 35,
              v: 7,
              w: 20,
              x: 52.5,
              y: 65,
            },
            {
              c: 'green',
              h: 30,
              v: 6,
              w: 20,
              x: 52.5,
              y: 35,
            },
          ],
        ];
      expect(actual).toEqual(expected);
    });
  });

  describe('.getKeys', () => {
    it('should return the list of unique values in a RawStackedBarData array', () => {
      const actual = dataProcessor.getKeys(FAKE_DATA);
      const expected = ['investment', 'revenue', 'complements'];

      expect(actual).toEqual(expected);
    });
  });
});





