import path from 'path';
import { Request, Response, Router } from "express";
import { ErrorComponent } from "../components/error/error.component";
import { ErrorType } from "../models/error/error-type.model";

import { HelloWorldService } from "../services/hello-world/hello-world.service"

const routes = Router();
const helloWorldService = HelloWorldService.Instance;

routes.get("/something", (req: Request, res: Response, next: any) => {
  res.send(JSON.stringify({text:"something"}));
});

routes.post("/orders/order", (req: Request, res: Response, next: any) => {
  const body = req.body;
  if ("something" in body) {
    res.status(200);
    res.send(body.something);
  } else {
    res.status(200);
    res.send("Add something key to body and get its value back.");
  }
  
});

export default routes;
