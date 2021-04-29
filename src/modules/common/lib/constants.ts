import { Routes } from "modules/common/lib/types";

// TODO: figure out a better way to manage route access
export const ALLOWED_PATH_BY_ROLE: Routes = {
  admin: ["/administrator", "/administrator/fund"],
  manager: ["/manager"],
};
