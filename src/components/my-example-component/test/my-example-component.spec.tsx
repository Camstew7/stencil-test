import { newSpecPage } from '@stencil/core/testing';
import { MyExampleComponent } from '../my-example-component';

describe('my-example-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyExampleComponent],
      html: `<my-example-component></my-example-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-example-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-example-component>
    `);
  });
});
