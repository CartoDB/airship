import { TestWindow } from '@stencil/core/dist/testing';
import { RangeSliderThumb } from './as-range-slider-thumb';

describe('as-range-slider-thumb', () => {
    it('should build', () => {
        expect(new RangeSliderThumb()).toBeTruthy();
    });

    describe('rendering', () => {
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
            expect(element.textContent).toBe('5€');
        });

        it('should have aria attributes', async () => {
            element.value = 5;
            element.valueMin = 0;
            element.valueMax = 10;
            element.formatValue = () => `${element.value}€`;
            await testWindow.flush();

            const div = element.querySelector('div');
            expect(div.getAttribute('role')).toEqual('slider');
            expect(div.getAttribute('aria-valuenow')).toEqual('5');
            expect(div.getAttribute('aria-valuemin')).toEqual('0');
            expect(div.getAttribute('aria-valuemax')).toEqual('10');
            expect(div.getAttribute('aria-valuetext')).toEqual('5€');
        });
    });
});