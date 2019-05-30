import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend.scss',
  tag: 'as-legend',
})
export class Legend {
  @Prop() public loading: boolean;
  @Prop() public heading: string;
  @Prop() public description: string;

  public render() {
    return (
      <div class='as-legend--wrapper'>
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
      <div class='as-legend--legends-slot'>
        <slot name='legends'></slot>
      </div>,
      <div class='as-legend--source'>
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
