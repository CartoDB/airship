import { vlToAirship } from './histogram';

describe('utils/conversion/histogram', () => {
  it('should correctly convert from VL data to Airship format', () => {
    const airship = vlToAirship([
      {
        x: [0, 10],
        y: 20
      },
      {
        x: [10, 20],
        y: 30
      },
      {
        x: [20, 30],
        y: 10
      }
    ]);

    expect(airship[0].start).toBe(0);
    expect(airship[0].end).toBe(10);
    expect(airship[0].value).toBe(20);
  });
});
