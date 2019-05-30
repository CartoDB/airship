import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legends.scss',
  tag: 'as-legends',
})
export class Legend {
  @Prop() public loading: boolean;
  @Prop() public heading: string;
  @Prop() public description: string;

  public render() {
    return (
      <div class='as-legends--wrapper'>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }

  private renderContent() {
    if (this.loading) {
      return null;
    }

    return [
      <div class='as-legends--legends-slot'>
        <slot name='legends'></slot>
      </div>,
      <div class='as-legends--source'>
        <slot name='source'></slot>
      </div>
    ];
  }

  private renderHeader() {
    return <as-widget-header
              header={this.heading}
              subheader={this.description}
            >
            </as-widget-header>;
  }
}
