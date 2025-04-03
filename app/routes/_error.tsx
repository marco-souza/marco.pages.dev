import type { ErrorHandler } from "hono";

const handler: ErrorHandler = (e, c) => {
  console.error(e);
  return c.render(
    <ErrorPage
      code={500}
      title="Oops! Something went wrong."
      description={e.message}
    />,
  );
};

export default handler;
