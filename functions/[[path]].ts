import { createPagesFunctionHandler } from "@react-router/cloudflare";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - the server build file is generated by `react-router build`
import * as build from "../build/server";
import { getLoadContext } from "../load-context";

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext,
});