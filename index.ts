import { Core } from "./core/core.ts";
import { logger } from "./core/middlewares/logger.ts";
import { RouteError } from "./core/utils/route-error.ts";

const core = new Core();

core.router.use([logger]);

core.router.get("/", (req, res) => {
  res.status(200).end("Hello World");
});

core.router.get("/curso/:slug", (req, res) => {
  const { slug } = req.params;
  const courses = ["javascript", "php", "python"];
  const course = courses.includes(slug);
  if(!course) {
    throw new RouteError(404, "Curso não encontrado!");
  }

  res.status(200).json(slug);
});

core.init();