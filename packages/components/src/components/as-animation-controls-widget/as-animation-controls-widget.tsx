import { Component, Event, h, Prop } from '@stencil/core';
import { EventEmitter } from 'events';
import { icon } from '../../utils/icons';
import contentFragment from '../common/content.fragment';

@Component({
  shadow: false,
  styleUrl: './as-animation-controls-widget.scss',
  tag: 'as-animation-controls-widget',
})
export class AnimationControlsWidget {
  /**
   * This attribute is the percentage of progress elapsed on an animation.
   */
  @Prop () public progress: number = 0;
  @Prop () public min: number = 0;
  @Prop () public max: number = 100;
  @Prop () public duration: number = 0;
  /**
   * Use this attribute to put the widget in "loading mode".
   * When loading mode is active, a spinner will be shown and the data will be hidden.
   */
  @Prop() public isLoading: boolean = false;

  @Prop() public showThumb: boolean = true;
  @Prop() public showThumbCaption: boolean = false;
  @Prop() public playing: boolean = false;

  /**
   * Title of the widget to be displayed
   *
   * @type {string}
   * @memberof AnimationControlsWidget
   */
  @Prop() public heading: string;

  /**
   * Description of the widget to be displayed
   *
   * @type {string}
   * @memberof AnimationControlsWidget
   */
  @Prop() public description: string;

  /**
   * Toggles displaying title and description
   *
   * @type {boolean}
   * @memberof AnimationControlsWidget
   */
  @Prop() public showHeader: boolean = true;

  /**
   * Message shown in header when no data is available
   */
  @Prop() public noDataHeaderMessage: string = 'NO DATA AVAILABLE';

  /**
   * Message shown in body when no data is available
   */
  @Prop() public noDataBodyMessage: string = 'There is no data to display.';

  /**
   * Use this widget to put the widget in "error mode".
   * When error mode is active. The header will display the given text.
   * And the body will be display the errorDescription instead any data.
   */
  @Prop() public error: string = '';

  /**
   * Extended error description, only shown when error is present
   */
  @Prop() public errorDescription: string = '';

  private _isPlaying: boolean = false;

  /**
   * User clicks the play button
   */
  @Event ()
  private play: EventEmitter;

  /**
   * User clicks the pause button
   */
  @Event()
  private pause: EventEmitter;

  /**
   * The user has seeked the animation to this percentage.
   */
  @Event()
  private seek: EventEmitter;

  public render() {
    return [
      this._renderHeader(),
      this._renderContent()
    ];
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return <as-widget-header
      header={this.heading}
      subheader={this.description}
      is-loading={this.isLoading}
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private _renderContent() {
    return contentFragment(
      this.isLoading,
      this.error,
      false, // isEmtpy
      this.heading,
      this.errorDescription,
      this.noDataBodyMessage,
      <div class='as-animation-controls-widget__wrapper'>
        <button class='as-btn' onClick={this._onPlayPauseClick.bind(this)}>
          {icon(this.playing ? 'PAUSE' : 'PLAY', 'var(--as--color--primary)', { width: '32px', height: '32px'})}
        </button>
        <as-range-slider
          value={this.progress}
          min-value={this.min}
          max-value={this.max}
          showThumb={this.showThumb}
          showThumbCaption={this.showThumbCaption}
          onChange={this._onThumbChange.bind(this)}
          onChangeStart={this._onThumbChangeStart.bind(this)}
          onChangeEnd={this._onThumbChangeEnd.bind(this)}>
        </as-range-slider>
      </div>
    );
  }

  private _onPlayPauseClick(evt) {
    this.playing ? this._pause(evt) : this._play(evt);
  }

  private _pause(evt) {
    this.pause.emit(evt);
    this.playing = false;
  }

  private _play(evt) {
    this.play.emit(evt);
    this.playing = true;
  }

  private _onThumbChange(evt: CustomEvent) {
    this.seek.emit(evt.detail);
  }

  private _onThumbChangeStart(evt: CustomEvent) {
    this._isPlaying = this.playing;

    if (this.playing) {
      this._pause(evt);
    }
  }

  private _onThumbChangeEnd(evt: CustomEvent) {
    if (this._isPlaying) {
      this._play(evt);
    }
  }
}
