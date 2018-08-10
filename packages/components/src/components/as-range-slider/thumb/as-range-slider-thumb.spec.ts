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
            element.percentage = 10;
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

            this.simulateKeyDownEvent = (targetElement: HTMLElement, code: number) => {
                const event = new (testWindow.window as any).KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    keyCode: code
                });
                targetElement.dispatchEvent(event);
                return event;
            };

            this.simulateMouseEvent = (targetElement: HTMLElement, type: string, eventData: any) => {
                const data = Object.assign({
                    bubbles: true,
                    cancelable: true
                }, eventData);
                const mouseEvent = new (testWindow.window as any).MouseEvent(type, data);
                targetElement.dispatchEvent(mouseEvent);
                return mouseEvent;
            };
        });

        it('should emit thumbIncrease / thumbDecrease events when using keyboard arrows', async () => {
            const onThumbIncreaseSpy = jest.fn();
            element.addEventListener('thumbIncrease', onThumbIncreaseSpy);

            const onThumbDecreaseSpy = jest.fn();
            element.addEventListener('thumbDecrease', onThumbDecreaseSpy);
            await testWindow.flush();

            const LEFT_KEY = 37;
            this.simulateKeyDownEvent(element, LEFT_KEY);
            expect(onThumbDecreaseSpy).toHaveBeenCalled();

            const RIGHT_KEY = 39;
            this.simulateKeyDownEvent(element, RIGHT_KEY);
            expect(onThumbIncreaseSpy).toHaveBeenCalled();
        });

        it('should emit changeStart event when using mousemove', async () => {
            const onChangeStartSpy = jest.fn();
            element.addEventListener('changeStart', onChangeStartSpy);
            await testWindow.flush();

            this.simulateMouseEvent(element, 'mousedown');
            expect(onChangeStartSpy).toHaveBeenCalled();
            expect(element.classList).toContain('as-range-slider__thumb--moving');
        });

        // it('should emit thumbMove event when using mouse', async () => {
        //     const onThumbMoveSpy = jest.fn();
        //     element.addEventListener('thumbMove', onThumbMoveSpy);
        //     await testWindow.flush();

        //     this.simulateMouseEvent(element, 'mousedown');
        //     this.simulateMouseEvent(element, 'mousemove');
        //     this.simulateMouseEvent(element, 'mouseup');

        //     expect(onThumbMoveSpy).toHaveBeenCalled();
        // });

    });
});