import { Core } from "./core/core.ts";

const core = new Core();

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