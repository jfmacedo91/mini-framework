import { Core } from "./core/core.ts";

const core = new Core();

core.router.get("/", (req, res) => {
  res.status(200).end("Hello World");
});

core.init();