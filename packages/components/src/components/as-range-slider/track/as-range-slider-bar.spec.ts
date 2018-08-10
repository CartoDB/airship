import { TestWindow } from '@stencil/core/dist/testing';
import { RangeSliderBar } from './as-range-slider-bar';

describe('as-range-slider-bar', () => {
    it('should build', () => {
        expect(new RangeSliderBar()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element: HTMLAsRangeSliderBarElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [RangeSliderBar],
                html: '<as-range-slider-bar></as-range-slider-bar>'
            });
        });

        it('should render a bar with its values', async () => {
            element.rangeStartPercentage = 20;
            element.rangeEndPercentage = 80;
            element.stepPercentage = 10;

            await testWindow.flush();
            expect(element).toMatchSnapshot();
        });
    });
});