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
});