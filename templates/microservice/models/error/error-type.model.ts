export enum ErrorType {
  empty = "missing_input",
  already_exists = "already_exists",
  invalid = "invalide_value",
  system = "system_error",
  no_data = "no_data_available",
  no_permission = "no_permission",
  need_login = "login_required",
  payment_needed = "payment_needed"
}

export let ErrorTypeHttpStatusMap = {
  already_exists: 400,
  invalide_value: 400,
  login_required: 401,
  missing_input: 400,
  no_data_available: 404,
  no_permission: 403,
  system_error: 500,
  payment_needed: 402
};
