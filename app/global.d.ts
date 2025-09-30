// global type definitions
import "typed-htmx";
import type {} from "hono";

type Head = {
  title?: string;
};

declare module "hono" {
  type ContextRenderer = (
      content: string | Promise<string>,
      head?: Head,) => Response | Promise<Response>
}

declare module "hono/jsx" {
  namespace JSX {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}
