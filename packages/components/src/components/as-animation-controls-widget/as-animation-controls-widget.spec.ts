import { AnimationControlsWidget } from './as-animation-controls-widget';

describe('as-animation-controls', () => {
  it('should build', () => {
    expect(new AnimationControlsWidget()).toBeTruthy();
  });

  describe('Logic', () => {
    let animationControlsWidget;

    beforeEach(async () => {
      animationControlsWidget = new AnimationControlsWidget();
    });

    it('should emit a play event when calling play and it is not playing', async () => {
      spyOn(animationControlsWidget.play, 'emit');
      spyOn(animationControlsWidget.pause, 'emit');
      animationControlsWidget.playing = false;
      animationControlsWidget._onPlayPauseClick();

      expect(animationControlsWidget.playing).toBeTruthy();
      expect(animationControlsWidget.play.emit).toHaveBeenCalled();
    });

    it('should not emit a play event when calling play and it is playing', async () => {
      spyOn(animationControlsWidget.play, 'emit');
      animationControlsWidget.playing = true;
      animationControlsWidget._onPlayPauseClick();

      expect(animationControlsWidget.playing).toBeFalsy();
      expect(animationControlsWidget.play.emit).not.toHaveBeenCalled();
    });

    it('should emit a pause event when calling pause and it is playing', async () => {
      spyOn(animationControlsWidget.pause, 'emit');
      animationControlsWidget.playing = true;
      animationControlsWidget._onPlayPauseClick();

      expect(animationControlsWidget.playing).toBeFalsy();
      expect(animationControlsWidget.pause.emit).toHaveBeenCalled();
    });

    it('should not emit a pause event when calling pause and it not is playing', async () => {
      spyOn(animationControlsWidget.pause, 'emit');
      animationControlsWidget.playing = false;
      animationControlsWidget._onPlayPauseClick();

      expect(animationControlsWidget.playing).toBeTruthy();
      expect(animationControlsWidget.pause.emit).not.toHaveBeenCalled();
    });

    it('should emit a seek event when the range thumb has been changed', async () => {
      spyOn(animationControlsWidget.seek, 'emit');
      animationControlsWidget._onThumbChange({ detail: 15 });
      expect(animationControlsWidget.seek.emit).toHaveBeenCalled();
    });

    it('should emit a pause event when the range thumb has started to change if it is playing', async () => {
      spyOn(animationControlsWidget, '_pause');
      animationControlsWidget.playing = true;
      animationControlsWidget._onThumbChangeStart();
      expect(animationControlsWidget._pause).toHaveBeenCalled();
    });

    it('should not emit a pause event when the range thumb has started to change if it is not playing', async () => {
      spyOn(animationControlsWidget, '_pause');
      animationControlsWidget.playing = false;
      animationControlsWidget._onThumbChangeStart();
      expect(animationControlsWidget._pause).not.toHaveBeenCalled();
    });

    it('should not emit a play event when the range thumb has finished to change if it was not playing', async () => {
      spyOn(animationControlsWidget, '_play');
      animationControlsWidget.playing = false;
      animationControlsWidget._onThumbChangeStart();
      animationControlsWidget._onThumbChangeEnd();
      expect(animationControlsWidget._play).not.toHaveBeenCalled();
    });


    it('should emit a play event when the range thumb has finished to change if it was playing', async () => {
      spyOn(animationControlsWidget, '_play');
      animationControlsWidget.playing = true;
      animationControlsWidget._onThumbChangeStart();
      animationControlsWidget._onThumbChangeEnd();
      expect(animationControlsWidget._play).toHaveBeenCalled();
    });
  });
});
