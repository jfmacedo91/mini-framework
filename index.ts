import { Core } from "./core/core.ts";
import { logger } from "./core/middlewares/logger.ts";
import { RouteError } from "./core/utils/route-error.ts";

const core = new Core();

core.router.use([logger]);

core.db.exec(/*sql*/`
  CREATE TABLE IF NOT EXISTS "products" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE
  );

  INSERT OR IGNORE INTO "products"
    ("slug", "name")
  VALUES
    ('notebook', 'Notebook');
`);

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

core.router.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  const product = core.db.query(/*sql*/`SELECT * FROM "products" WHERE "slug" = ?`).get(slug);
  if(!product) {
    throw new RouteError(404, "Produto não encontrado!");
  }

  res.status(200).json(product);
});

core.init();