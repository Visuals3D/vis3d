import path from "path";
import winston from "winston";
import dotenv from "dotenv";
import { ErrorComponent } from "../../errors/api/error.component";

/**
 * A service to make logging with the winston package easier.
 * Services are always singelton pattern. To use this service get a Instance of it.
 *
 * @autor Kilian Mehringer
 */
export class LoggerService {
  private static _instance: LoggerService;
  private isProduction: boolean = process.env.NODE_ENV === "production";
  private logger: winston.Logger;
  private PROJECT_ROOT = path.join(__dirname, "..");
  private dataFolderPath = '';

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  /**
   * The private constructor for this server to implement a singelton pattern.
   * In this constructor the winston logger is initialized for logging
   *
   * @constructor
   * @autor Kilian Mehringer
   */
  private constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.dataFolderPath = path.join(__dirname, "./../../../../../data");
    } else {
      this.dataFolderPath = path.join(__dirname, "./../../../data");
    }
    dotenv.config();
    this.logger = winston.createLogger({
      defaultMeta: { service: process.env.TITLE },
      format: winston.format.json(),
      level: "info",
      transports: [
        new winston.transports.File({ filename: path.join(this.dataFolderPath, "error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(this.dataFolderPath ,"combined.log") }),
      ]
    });

    if (!this.isProduction) {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  /**
   * Log some informations.
   *
   * @autor Kilian Mehringer
   * @param data The string with the informations to log
   */
  public logInfo(data: string) {
    this.logger.info(data);
  }

  /**
   * Log an error
   *
   * @autor Kilian Mehringer
   * @param err The error object to log
   */
  public logError(err: Error) {
    if (process.env.NODE_ENV === 'production') {
      this.logger.error(err);
    } else {
      console.error(err);
    }
  }

}
