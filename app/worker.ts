export default {
  async fetch(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ) {
    return new Response("Hello World!");
  },
};
