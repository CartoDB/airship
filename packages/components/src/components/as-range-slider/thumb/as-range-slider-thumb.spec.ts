import { TestWindow } from '@stencil/core/dist/testing';
import { RangeSliderThumb } from './as-range-slider-thumb';

describe('as-range-slider-thumb', () => {
    it('should build', () => {
        expect(new RangeSliderThumb()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element: HTMLAsRangeSliderThumbElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [RangeSliderThumb],
                html: '<as-range-slider-thumb></as-range-slider-thumb>'
            });
        });

        it('should render a text with its value', async () => {
            element.value = 5;
            element.formatValue = () => `${element.value}€`;

            await testWindow.flush();
            expect(element).toMatchSnapshot();
        });

        it('should have aria attributes', async () => {
            element.value = 5;
            element.valueMin = 0;
            element.valueMax = 10;
            element.formatValue = () => `${element.value}€`;
            await testWindow.flush();

            expect(element).toMatchSnapshot();
        });
    });

    describe('Interaction', () => {
        let element: HTMLAsRangeSliderThumbElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [RangeSliderThumb],
                html: '<as-range-slider-thumb></as-range-slider-thumb>'
            });

            this.getKeyDownEvent = (code: number) => {
                const event = new (testWindow.window as any).KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    keyCode: code
                });
                return event;
            };
        });

        it('should emit thumbIncrease / thumbDecrease events when using keyboard ', async () => {
            const onThumbIncreaseSpy = jest.fn();
            element.addEventListener('thumbIncrease', onThumbIncreaseSpy);

            const onThumbDecreaseSpy = jest.fn();
            element.addEventListener('thumbDecrease', onThumbDecreaseSpy);
            await testWindow.flush();

            const LEFT_KEY_EVENT = this.getKeyDownEvent(37);
            element.dispatchEvent(LEFT_KEY_EVENT);
            expect(onThumbDecreaseSpy).toHaveBeenCalled();

            const RIGHT_KEY_EVENT = this.getKeyDownEvent(39);
            element.dispatchEvent(RIGHT_KEY_EVENT);
            expect(onThumbIncreaseSpy).toHaveBeenCalled();
        });

        //   // TODO. keyboard events:
        //   // https://github.com/ionic-team/stencil/issues/572
        //   // https://stackoverflow.com/questions/33638385/simulate-keydown-on-document-for-jest-unit-testing
        //   // https://stackoverflow.com/questions/51660360/is-there-any-way-write-the-test-cases-of-mouse-keyboard-events-in-jest
    });
});