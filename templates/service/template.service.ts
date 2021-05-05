// -------------------- Packages -----------------

// --------------------- Models ------------------

// --------------------- Errors ------------------
// import { CustomError } from './${SERVICE_NAME}.errors';

// ------------------- Components ----------------

// -------------------- Services -----------------
//import { ImportedService } from './imported.service';

// --------------------- Types -------------------


export class ${SERVICE_NAME}Service {

  private static _instance: ${SERVICE_NAME}Service;
  //private importedService: ImportedService;

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  private constructor() {
    //this.importedService = ImportedService.Instance;
  }

}
