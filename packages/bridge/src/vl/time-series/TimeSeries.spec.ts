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
        _changed: () => ({}),
        filter: {
          blendTo: () => ({})
        },
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

    layer.emitter = mitt();
  });

  describe('validation', () => {
    it('should throw an error if viz does not have an animation variable', () => {
      const mockCb = jest.fn();

      delete layer.viz.variables.animation;

      const init = () => {
        // tslint:disable no-unused-expression
        new TimeSeries({}, layer, 'column', widget, mockCb, null, null, null, null, null);
      };

      expect(init).toThrow();
    });
  });

  describe('readyCb', () => {
    it('should fire immediately if layer is already loaded', () => {
      const mockCb = jest.fn();

      // tslint:disable no-unused-expression
      new TimeSeries({}, layer, 'column', widget, mockCb, null, null, null, null, null);

      expect(mockCb).toHaveBeenCalled();
    });

    it('should fire after layer fires loaded event', () => {
      const mockCb = jest.fn();

      const oldViz = layer.viz;
      layer.viz = undefined;

      // tslint:disable no-unused-expression
      new TimeSeries({}, layer, 'column', widget, mockCb, null, null, null, null, null);

      expect(mockCb).not.toHaveBeenCalled();

      layer.viz = oldViz;
      layer.emitter.emit('loaded');

      expect(mockCb).toHaveBeenCalled();
    });
  });
});
