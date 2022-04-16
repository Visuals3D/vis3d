import { Request, Response, Router } from "express";
import infoRoutes from "./info/info.routes";
import { HelloWorldService } from "../services/hello-world/hello-world.service";

const helloWorldService = HelloWorldService.Instance;

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.render("index", {
    title: "Webpage Title",
    start: true,
    text: helloWorldService.getHelloWordlText()
  });
});

routes.get("/impressum", (req: Request, res: Response) => {
  return res.render("impressum", {
    title: "Impressum",
    start: true
  });
});

routes.use("/info", infoRoutes);

export default routes;
