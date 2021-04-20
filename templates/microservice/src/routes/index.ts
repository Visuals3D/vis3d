import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import * as ApiRoutes from "./api/index.route";

import { LoggerService } from "../services/logger/logger.service";
const loggerService: LoggerService = LoggerService.Instance;

dotenv.config();

const API_VERSION = process.env.API_VERSION;
const TITLE = process.env.TITLE;

loggerService.logInfo("SUCCESS: " + TITLE);

router.use('', ApiRoutes.router);

export { router };
