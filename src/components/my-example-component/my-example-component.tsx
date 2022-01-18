import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-example-component',
  styleUrl: 'my-example-component.scss',
  shadow: true,
})
export class MyExampleComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
