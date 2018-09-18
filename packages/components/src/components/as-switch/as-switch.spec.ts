import { TestWindow } from '@stencil/core/dist/testing';
import { Switch } from './as-switch';

describe.only('as-switch', () => {
  it('should build', () => {
    expect(new Switch()).toBeTruthy();
  });

  describe('when the component is enabled', () => {
    let element: HTMLAsToolbarElement;

    beforeEach(async () => {
      element = await _prepareTest('<as-switch id="switch"></as-switch>');
    });

    it('should emit an event with current status when component toggles', async () => {
      const spy = _spyOnElement(element);

      element.click();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(true);
    });

    it('should emit an event with current status when component toggles', async () => {
      const spy = _spyOnElement(element);


      element.click();
      element.click();
      element.click();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(true);
      expect(spy.mock.calls[1][0].detail).toBe(false);
      expect(spy.mock.calls[2][0].detail).toBe(true);
    });
  });

  describe('when the component is disabled', () => {
    let element: HTMLAsToolbarElement;

    beforeEach(async () => {
      element = await _prepareTest('<as-switch disabled id="switch"></as-switch>');
    });

    it('should NOT emit an event with current status when component toggles', async () => {
      const spy = _spyOnElement(element);

      element.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when the component is checked', () => {
    let element: HTMLAsToolbarElement;

    beforeEach(async () => {
      element = await _prepareTest('<as-switch checked id="switch"></as-switch>');
    });

    it('should return event (FALSE) when the element is clicked for the first time', async () => {
      const spy = _spyOnElement(element);
      element.click();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(false);
    });
  });
});

async function _prepareTest(html) {
  const tw = new TestWindow();
  const e = await tw.load({
    components: [Switch],
    html,
  });
  await tw.flush();
  return e;
}

function _spyOnElement(element) {
  const spy = jest.fn();
  element.addEventListener('change', spy);
  return spy;
}
