/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyExampleComponent {
    }
}
declare global {
    interface HTMLMyExampleComponentElement extends Components.MyExampleComponent, HTMLStencilElement {
    }
    var HTMLMyExampleComponentElement: {
        prototype: HTMLMyExampleComponentElement;
        new (): HTMLMyExampleComponentElement;
    };
    interface HTMLElementTagNameMap {
        "my-example-component": HTMLMyExampleComponentElement;
    }
}
declare namespace LocalJSX {
    interface MyExampleComponent {
    }
    interface IntrinsicElements {
        "my-example-component": MyExampleComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-example-component": LocalJSX.MyExampleComponent & JSXBase.HTMLAttributes<HTMLMyExampleComponentElement>;
        }
    }
}