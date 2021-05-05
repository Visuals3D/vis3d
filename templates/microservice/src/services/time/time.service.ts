// --------------------- Models ------------------

// ------------------- Components ----------------

// -------------------- Services -----------------
import { LoggerService } from "../logger/logger.service";

export class TimeService {
  private static _instance: TimeService;

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  private constructor() {
      
  }

  /** 
   * Removes the time component of a Date. Basicly it sets the Hours, Minutes and seconds to zero
   * This can be used to easily check if two dates are on the same day, ignoring the exact time on that day
   * 
   * @author Kilian Mehringer
   * @param date The Date with a time component
   * @returns A Date with hours, minutes and seconds to zero
  */
  public getTimelessDate(date: Date): Date {
    let newDate = new Date(date.toISOString());
    newDate.setHours(0,0,0,0);
    return newDate;
  }

  /** 
   * Check if a String is a valide Date string that could be converted to a Date Object
   * 
   * @author Kilian Mehringer
   * @param str The String to test
   * @returns A boolean with true if its a valid Date stirng and false if not
  */
  public isDateString(str:string) {
    return Date.parse(str) > 0;
  }

  /** 
   * Creates a UTC date string from a given Date with a time zone.
   * This is used to convert timestamps into UTC Time before pushing into UTC only databases
   * 
   * @author Kilian Mehringer
   * @param date The Date with time zone 
   * @returns The utc time string created from the given date 
  */
  public utcStringFromDate(date: Date) {
    const zeroedDate = date.getUTCDate() >= 10 ? date.getUTCDate() : '0' +  date.getUTCDate();
    const zeroedMonth = date.getUTCMonth() >= 9 ? date.getUTCMonth() + 1 : '0' +  (date.getUTCMonth() + 1);
    const zeroedHours = date.getUTCHours() >= 10 ? date.getUTCHours() : '0' +  date.getUTCHours();
    const zeroedMinute = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : '0' +  date.getUTCMinutes();
    const zeroedSecond = Math.floor(date.getUTCSeconds()) >= 10 ? Math.floor(date.getUTCSeconds()) : '0' +  Math.floor(date.getUTCSeconds());
    return date.getUTCFullYear() + '-' + zeroedMonth + '-' + zeroedDate + 'T' + zeroedHours + ':' + zeroedMinute + ':' + zeroedSecond;
  }

  /** 
   * This simply returns one day in miliseconds
   * 
   * @author Kilian Mehringer
   * @returns One day in miliseconds
  */
  public getDayInMs() {
    return (1000 * 60 * 60 * 24);
  }
}
