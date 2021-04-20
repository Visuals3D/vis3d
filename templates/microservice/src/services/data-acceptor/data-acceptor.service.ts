// --------------------- Models ------------------
import { ErrorType } from "../../../models/error/error-type.model";

// ------------------- Components ----------------

import { ErrorStackComponent } from "../../components/error-stack/error-stack.component";
import { ErrorComponent } from "../../components/error/error.component";

// -------------------- Services -----------------
// import { LoggerService } from "../logger/logger.service";

/**
 * A Service that can be used to validate incomming data trough http requests.
 * Every function is able to take a ErrorStack Object as a param and pushes errors to the stack if the given data is invalide.
 *
 * @author: Kilian Mehringer
 */
export class DataAcceptorService {
  private static _instance: DataAcceptorService;
  // private loggerService: LoggerService;

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  /**
   * Private constructor. Empty
   *
   * @constructor
   * @author: Kilian Mehringer
   */
  private constructor() {
    // this.loggerService = LoggerService.Instance;
  }

  /**
   * Checks a given object for beeing a number object in the integer range. Pushes an error to the given ErrorStack if its not.
   *
   * @author: Kilian Mehringer
   * @param num The number object to check
   * @param errStack The ErrorStack to push the error to if the given number is invalide
   * @param inputId? Optional input_id name of the field
   * @return true if the given object was a number otherwise false
   */
  public isIntegerNumber(num: number, errStack: ErrorStackComponent, inputId?: string): boolean {
    if (this.checkIsNumber(num, errStack, inputId)) {
      if (!Number.isInteger(num)) {
        const error: ErrorComponent = new ErrorComponent("Invalide Value " + num, ErrorType.invalid, inputId);
        errStack.add(error);
      }
      return Number.isInteger(num);
    } else {
      return false;
    }
  }

  /**
   * Checks a given object for beeing a number and if its a number it gets checked for beeing a number between 0 and 1.
   * Pushes an error to the given ErrorStack if its not.
   *
   * @author: Kilian Mehringer
   * @param num The number object to check
   * @param errStack The ErrorStack to push the error to if the given number is invalide
   * @param inputId? Optional input_id name of the field
   * @return true if the given object was a number and between 0 an 1 otherwise false
   */
  public isNormalizedNumber(num: number, errStack: ErrorStackComponent, inputId?: string): boolean {
    if (this.checkIsNumber(num, errStack, inputId)) {
      if (!(num <= 1 && num >= 0)) {
        const error: ErrorComponent = new ErrorComponent("Invalide Value " + num, ErrorType.invalid, inputId);
        errStack.add(error);
      }
      return num <= 1 && num >= 0;
    } else {
      return false;
    }
  }

  /**
   * Checks a given object for beeing a number and if its a number it gets checked for beeing a number between 0 and 1.
   * Pushes an error to the given ErrorStack if its not.
   *
   * @author: Kilian Mehringer
   * @param num The number object to check
   * @param errStack The ErrorStack to push the error to if the given number is invalide
   * @param inputId? Optional input_id name of the field
   * @return true if the given object was a number and between 0 an 1 otherwise false
   */
  public checkDateString(str: string, errStack: ErrorStackComponent, inputId?: string): boolean {
    if (!(Date.parse(str) > 0)) {
      const error: ErrorComponent = new ErrorComponent("Invalide Value " + str, ErrorType.invalid, inputId);
      errStack.add(error);
    }
    return Date.parse(str) > 0;
  }

  /**
   * Compares Keys of two objects. The result is true if they are all identical and false if at least one of them is different or missing.
   *
   * @author: Kilian Mehringer
   * @param patternObject The Object used as reference object. The second will be checked against this one
   * @param compObj The Object that will be compared to the patternObject for identical keys
   * @param errStack The ErrorStack to push the error to if keys are not identical
   * @param inputId? Optional input_id name of the field
   * @return true if key of objects are identical and false if not
   */
  public compareKeys(patternObj:object, compObj:object, errStack:ErrorStackComponent) {
    let isKeyMissing:boolean = false;
    Object.keys(patternObj).forEach((key) => {
      if(!(key in compObj)) {
        isKeyMissing = true;
        const err: ErrorComponent = new ErrorComponent("Missing Value " + key, ErrorType.invalid, key);
        errStack.add(err);
      }
    });
    return !isKeyMissing;
  }

  /**
   * Checks a given object for beeing a number object in the. Pushes an error to the given ErrorStack if its not.
   *
   * @author: Kilian Mehringer
   * @param num The number object to check
   * @param errStack The ErrorStack to push the error to if the given number is invalide
   * @param inputId? Optional input_id name of the field
   * @return true if the given object was a number otherwise false
   */
  public checkIsNumber(num:number, errStack: ErrorStackComponent, inputId?: string):boolean {
    if (isNaN(num)) {
      const error: ErrorComponent = new ErrorComponent("Invalide Value " + num, ErrorType.invalid, inputId);
      errStack.add(error);
    }
    return !isNaN(num);
  }


  /**
   * Ckecks if a given string matches the given regex expression and pushes errors into the given errorstack
   *
   * @author: Kilian Mehringer
   * @param regex The regularexpression to be used against the given string
   * @param str The string that will be tested against the given regex
   * @param errStack The ErrorStack to push the error to if the given number is invalide
   * @param inputId? Optional input_id name of the field
   * @return true if the strin matches re regularexpression false if not
   */
  public checkRegex(regex: RegExp, str: string, errStack: ErrorStackComponent, inputId?: string): boolean {
    const test: boolean = regex.test(str);
    if (test) {
      return true;
    } else {
      const err: ErrorComponent = new ErrorComponent("Invalide Value: " + str, ErrorType.invalid, inputId);
      errStack.add(err);
      return false;
    }
  }

  public checkIsEmailAdress(str:string, errStack:ErrorStackComponent, inputId?:string):boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(str).toLowerCase())) {
      return true;
    } else {
      const err: ErrorComponent = new ErrorComponent("Invalide Value: " + str, ErrorType.invalid, inputId);
      errStack.add(err);
      return false;
    }
  }
}
