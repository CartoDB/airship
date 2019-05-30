import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legends.scss',
  tag: 'as-legends',
})
export class BasicLegend {
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
      <slot name='footer'></slot>
    ];
  }

  private renderHeader() {
    if (this.heading || this.description) {
      return <as-widget-header
                header={this.heading}
                subheader={this.description}
              >
              </as-widget-header>;
    }
  }
}
