// -------------------- Packages -----------------

// --------------------- Models ------------------
import { paths, components, operations } from '../../../models/generated/api/api.schema';


// ------------------- Components ----------------

// -------------------- Services -----------------

// -------------------- Types --------------------
type HelloWorldRes= components['schemas']['HelloWorldRes'];


export class HelloWorldService {

  public static get Instance() {

      return this._instance || (this._instance = new this());
  }

  private static _instance: HelloWorldService;


  private constructor() {

  }

  public getHelloWorld():HelloWorldRes {
    return 'Hello World';
  }



}
