import { ErrorType } from "./error-type.model";
export interface ErrorModel {
  code?: number;
  message: string;
  status: number;
  errType: ErrorType;
}
