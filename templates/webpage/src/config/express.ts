import express, {
  Application,
  json,
  Request,
  Response,
  urlencoded
} from "express";
import { engine } from 'express-handlebars';
import { Server } from "http";
import path from "path";
import routesAPI from "../api/routes";
import routes from "../routes/index.rotes";
import cors from "cors";

const allowlist:string[] = [];

const corsOptionsDelegate = (req:Request, callback:any) => {
    let corsOptions;
    const origin = req.header('Origin');
    if (origin) {
      let isDomainAllowed = allowlist.indexOf(origin) !== -1;
      if (process.env.NODE_ENV === 'development') {isDomainAllowed = true};
      if (isDomainAllowed) {
          // Enable CORS for this request
          corsOptions = { origin: true }
      } else {
          // Disable CORS for this request
          corsOptions = { origin: false }
      }
    }

    callback(null, corsOptions)
}


function initExpress(): Server {
  const app: Application = express();

  // Set Template engine to handlebars
  app.engine("hbs", engine());
  app.set("view engine", "hbs");

  // Middleware
  app.use(cors(corsOptionsDelegate))
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use("/assets", express.static(path.join(__dirname, "../../assets")));
  app.use("/downloads", express.static(path.join(__dirname, "../../downloads")));

  app.use("/", routes);

  // Router V1
  app.use("/api", routesAPI);




  // Init Express
  const PORT: string | number = process.env.PORT || 8080;
  return app.listen(
    PORT,
    () => console.log(`Server started on port ${PORT}`) // tslint:disable-line
  );
}

export default initExpress;
