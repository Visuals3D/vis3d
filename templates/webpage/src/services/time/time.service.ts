// --------------------- Models ------------------

// ------------------- Components ----------------


// -------------------- Services -----------------

export class TimeService {
  private static _instance: TimeService;

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  private constructor() {

  }

  public getTimelessDate(date: Date): Date {
    let newDate = new Date(date.toISOString());
    newDate.setHours(0,0,0,0);
    return newDate;
  }

  public isDateString(str:string) {
    return Date.parse(str) > 0;
  }

  public utcStringFromDate(date: Date) {
    const zeroedDate = date.getUTCDate() >= 10 ? date.getUTCDate() : '0' +  date.getUTCDate();
    const zeroedMonth = date.getUTCMonth() >= 9 ? date.getUTCMonth() + 1 : '0' +  (date.getUTCMonth() + 1);
    const zeroedHours = date.getUTCHours() >= 10 ? date.getUTCHours() : '0' +  date.getUTCHours();
    const zeroedMinute = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : '0' +  date.getUTCMinutes();
    const zeroedSecond = Math.floor(date.getUTCSeconds()) >= 10 ? Math.floor(date.getUTCSeconds()) : '0' +  Math.floor(date.getUTCSeconds());
    return date.getUTCFullYear() + '-' + zeroedMonth + '-' + zeroedDate + 'T' + zeroedHours + ':' + zeroedMinute + ':' + zeroedSecond;
  }

  public getDayInMs() {
    return (1000 * 60 * 60 * 24);
  }

  public dateToDateOnlyString(date:Date) {
    const zeroedDate = date.getUTCDate() >= 10 ? date.getUTCDate() : '0' +  date.getUTCDate();
    const zeroedMonth = date.getUTCMonth() >= 9 ? date.getUTCMonth() + 1 : '0' +  (date.getUTCMonth() + 1);
    return zeroedDate + '.' + zeroedMonth + '.' + date.getUTCFullYear();
  }
}
