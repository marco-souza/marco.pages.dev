import type { NotFoundHandler } from "hono";
import ErrorPage from "@/components/ErrorPage";

const handler: NotFoundHandler = (c) => {
  return c.render(
    <ErrorPage
      code={404}
      title="Page Not Found"
      description="The page you are looking for does not exist."
    />,
  );
};

export default handler;
