import { Core } from "./core/core.ts";
import { logger } from "./core/middlewares/logger.ts";

const core = new Core();

core.router.use([logger]);

core.router.get("/", (req, res) => {
  res.status(200).end("Hello World");
});

core.router.get("/curso/:slug", (req, res) => {
  const { slug } = req.params;
  if(slug) {
    res.status(200).json(slug);
  } else {
    res.status(404).json("curso não encontrado")
  }
});

core.init();