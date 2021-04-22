// -------------------- Packages -----------------

// --------------------- Models ------------------

// ------------------- Components ----------------

// -------------------- Services -----------------
//import { ImportedService } from './imported.service';

export class ${SERVICE_NAME}Service {

  public static get Instance() {
      // Do you need arguments? Make it a regular static method instead.
      return this._instance || (this._instance = new this());
  }

  private static _instance: ${SERVICE_NAME}Service;
  //private importedService: ImportedService;

  private constructor() {
    this.importedService = ImportedService.Instance;
  }

}
