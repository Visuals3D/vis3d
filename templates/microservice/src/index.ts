// -------------------- Packages -----------------
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";


// --------------------- Models ------------------
import { ErrorType } from "../models/error/error-type.model";

// ------------------- Components ----------------
import { ErrorComponent } from "./components/error/error.component";

// -------------------- Services -----------------
import { LoggerService } from "./services/logger/logger.service";

// --------------------- Routes ------------------
import * as routes from "./routes/index";

dotenv.config();
const loggerService: LoggerService = LoggerService.Instance;

const app = express();
const isProduction: boolean = process.env.NODE_ENV === "production";
let port: string = process.env.PORT ? process.env.PORT : '8080';

const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGINS);

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin: string, callback: any) => {
    if (allowedOrigins.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  }
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors(corsOptions));

app.use("/", routes.router);

app.use(express.static(__dirname + "/public"));

app.use((req: any, res: any, next: any) => {
  const err = new ErrorComponent("Route not found: " + req.path, ErrorType.no_data);
  next(err);
});


// start the Express server
app.listen( port, () => {
    loggerService.logInfo( `SUCCESS: ${process.env.TITLE} running at http://localhost:${ port }` );
});

