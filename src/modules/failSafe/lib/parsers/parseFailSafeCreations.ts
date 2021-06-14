import { utils } from "ethers";

// failSafe
import { FailSafe } from "modules/failSafe/lib/types";

export const parseFailSafeCreations = (safeCreated: utils.Result): FailSafe => {
  return {
    admin: safeCreated.admin,
    rolManagerAddress: safeCreated.rolManagerAddress,
    safeName: safeCreated.safeName,
    timelockAddress: safeCreated.timelockAddress,
  };
};
