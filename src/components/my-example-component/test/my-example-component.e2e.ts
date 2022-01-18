import { newE2EPage } from '@stencil/core/testing';

describe('my-example-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-example-component></my-example-component>');

    const element = await page.find('my-example-component');
    expect(element).toHaveClass('hydrated');
  });
});
