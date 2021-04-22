// -------------------- Packages -----------------

// --------------------- Models ------------------
import { ErrorModel } from "../../../models/error/error.model";
import { ErrorType, ErrorTypeHttpStatusMap} from "../../../models/error/error-type.model";

// ------------------- Components ----------------

// -------------------- Services -----------------
import { LoggerService } from "../../services/logger/logger.service";

const loggerService: LoggerService = LoggerService.Instance;


/**
 * The Error Class used in the data-api typescript server.
 * This Error Class can be used for http responses. The Client will implement this class structure
 *
 * @author: Kilian Mehringer
 */
export class ErrorComponent implements ErrorModel {
  public errType: ErrorType;
  public code?: number;
  public message: string;
  public status: number;
  public inputId?: string;

  /**
   * Constructor for a new Error Object
   *
   * @constructor
   * @author: Kilian Mehringer
   * @param message The message representing this error
   * @param errType A Enum with the error type this error represents
   * @param inputId? Optional InputId name. This will be usefull to define for the client to display the error next to the matchin input field
   */
  constructor(message: string, errType: ErrorType, inputId?: string) {
    this.message = message;
    this.errType = errType;
    this.status = ErrorTypeHttpStatusMap[errType];
    this.inputId = inputId;
  }

  /**
   * Generates a string representing the Error object. The resulting String is in Json format.
   *
   * @author: Kilian Mehringer
   * @this {ErrorComponent}
   */
  public toString(): string {
    return JSON.stringify(this);
  }
}
