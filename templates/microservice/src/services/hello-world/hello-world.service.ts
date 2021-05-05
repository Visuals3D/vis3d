// -------------------- Packages -----------------

// --------------------- Models ------------------
import { paths, components, operations } from '../../../models/generated/api/api.schema';

// ------------------- Errors --------------------
import { InvalideWorldError } from './hello-world.errors';

// ------------------- Components ----------------

// -------------------- Services -----------------

// -------------------- Types --------------------
type HelloWorldRes= components['schemas']['HelloWorldRes'];


export class HelloWorldService {

  private static _instance: HelloWorldService;
  private error = false;

  public static get Instance() {

      return this._instance || (this._instance = new this());
  }


  private constructor() {

  }

  public getHelloWorld():HelloWorldRes {
    if (this.error) {
      throw new InvalideWorldError('Im a custom error');
    } else {
      return 'Hello World';
    }
  }



}
