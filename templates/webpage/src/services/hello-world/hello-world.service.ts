// --------------------- Models ------------------

// ------------------- Components ----------------


// -------------------- Services -----------------

export class HelloWorldService {
  private static _instance: HelloWorldService;
  private helloworldText = "Hello World";

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  private constructor() {

  }

  public getHelloWordlText(): String {
    return this.helloworldText;
  }

}
