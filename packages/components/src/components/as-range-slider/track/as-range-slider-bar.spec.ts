import { RangeSliderBar } from './as-range-slider-bar';

describe('as-range-slider-bar', () => {
  it('should build', () => {
      expect(new RangeSliderBar()).toBeTruthy();
  });

  describe('Methods', async () => {
    let element: RangeSliderBar;

    beforeEach(async () => {
      element = new RangeSliderBar();
    });

    describe('_onMove', async () => {
      it('should move from 20% to 0% when mouse is moved to the left of the screen', async () => {
        const barMoveEmitSpy = jest.fn();

        element.rangeStartPercentage = 20;
        element.rangeEndPercentage = 80;
        element.stepPercentage = 10;
        element.railElement = { offsetWidth: 100 } as HTMLElement;
        element.rangeBarElement = { offsetLeft: 20 } as HTMLElement;
        element.barMove = { emit: barMoveEmitSpy };

        const firstEvent = { pageX: 20 } as MouseEvent;
        const secondEvent = { pageX: 0 } as MouseEvent;

        // Set the mouse position to the current bar position
        element.onMove(firstEvent);

        // Move it to the left
        element.onMove(secondEvent);

        expect(element.rangeStartPercentage).toBe(0);
        expect(element.rangeEndPercentage).toBe(60);
        expect(barMoveEmitSpy).toHaveBeenCalled();
      });

      it('should move to 100% when calculated percentage is bigger than 100%', async () => {
        const barMoveEmitSpy = jest.fn();

        element.rangeStartPercentage = 20;
        element.rangeEndPercentage = 80;
        element.stepPercentage = 10;
        element.railElement = { offsetWidth: 100 } as HTMLElement;
        element.rangeBarElement = { offsetLeft: 20 } as HTMLElement;
        element.barMove = { emit: barMoveEmitSpy };

        const firstEvent = { pageX: 20 } as MouseEvent;
        const secondEvent = { pageX: 1000 } as MouseEvent;

        // Set the mouse position to the current bar position
        element.onMove(firstEvent);

        element.onMove(secondEvent);

        expect(element.rangeStartPercentage).toBe(40);
        expect(element.rangeEndPercentage).toBe(100);
        expect(barMoveEmitSpy).toHaveBeenCalled();
      });

      it('should move to 0% when calculated percentage is less than 0%', async () => {
        const barMoveEmitSpy = jest.fn();

        element.rangeStartPercentage = 20;
        element.rangeEndPercentage = 80;
        element.stepPercentage = 10;
        element.railElement = { offsetWidth: 100 } as HTMLElement;
        element.rangeBarElement = { offsetLeft: 20 } as HTMLElement;
        element.barMove = { emit: barMoveEmitSpy };

        const firstEvent = { pageX: 20 } as MouseEvent;
        const secondEvent = { pageX: -1000 } as MouseEvent;

        // Set the mouse position to the current bar position
        element.onMove(firstEvent);

        element.onMove(secondEvent);

        expect(element.rangeStartPercentage).toBe(0);
        expect(element.rangeEndPercentage).toBe(60);
        expect(barMoveEmitSpy).toHaveBeenCalled();
      });
    });
  });
});
