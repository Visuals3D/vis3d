// -------------------- Packages -----------------

// --------------------- Models ------------------

// ------------------- Components ----------------

// -------------------- Services -----------------


export class HelloWorldService {

  public static get Instance() {

      return this._instance || (this._instance = new this());
  }

  private static _instance: HelloWorldService;


  private constructor() {
 
  }

  public getHelloWorld():string {
    return 'Hello World';
  }

  

}
