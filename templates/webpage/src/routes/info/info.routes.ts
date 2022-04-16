import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/faq", (req: Request, res: Response) => {
  return res.render("faq", {
    title: "FAQs"
  });
});

export default routes;
