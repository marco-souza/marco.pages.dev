import { createApp } from "honox/server";
import { showRoutes } from "hono/dev";

const app = createApp();

showRoutes(app);

export default {
  fetch: app.fetch,
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ) {
    // Write code for updating your API
    switch (controller.cron) {
      case "* * * * *":
        console.log("Every minute");
        break;
      case "*/3 * * * *":
        console.log("Every three minutes");
        break;
      case "*/10 * * * *":
        console.log("Every ten minutes");
        break;
      case "*/45 * * * *":
        console.log("Every forty-five minutes");
        break;
    }
    console.log("cron processed");
  },
};
