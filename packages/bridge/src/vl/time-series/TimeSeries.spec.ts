import * as mitt from 'mitt';
import TimeSeries from './TimeSeries';

describe('vl/time-series/TimeSeries', () => {
  let widget: any;
  let layer: any;

  beforeEach(() => {
    // Big hack, we need addEventListener for some tests, and using the real widget is not easy
    widget = document.createElement('div'),
    layer = {
      emitter: null,
      on(event, cb) {
        this.emitter.on(event, cb);
      },
      viz: {
        variables: {
          animation: {
            duration: {
              value: 10
            },
            input: {
              max: 10,
              min: 0
            }
          }
        }
      }
    };

    layer.emitter = new mitt();
  });

  describe('validation', () => {
    it('should throw an error if viz does not have an animation variable', () => {
      const mockCb = jest.fn();

      delete layer.viz.variables.animation;

      const init = () => {
        // tslint:disable no-unused-expression
        new TimeSeries({}, layer, 'column', widget, mockCb);
      };

      expect(init).toThrow();
    });
  });

  describe('readyCb', () => {
    it('should fire immediately if layer is already loaded', () => {
      const mockedCb = jest.fn();

      // tslint:disable no-unused-expression
      new TimeSeries({}, layer, 'column', widget, mockedCb);

      expect(mockedCb).toHaveBeenCalled();
    });

    it('should fire after layer fires loaded event', () => {
      const mockedCb = jest.fn();

      const oldViz = layer.viz;
      layer.viz = undefined;

      // tslint:disable no-unused-expression
      new TimeSeries({}, layer, 'column', widget, mockedCb);

      expect(mockedCb).not.toHaveBeenCalled();

      layer.viz = oldViz;
      layer.emitter.emit('loaded');

      expect(mockedCb).toHaveBeenCalled();
    });
  });
});
