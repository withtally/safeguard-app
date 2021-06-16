import { utils } from "ethers";

// failSafe
import { SafeGuard } from "modules/safeGuard/lib/types";

export const parseSafeGuardCreations = (
  safeCreated: utils.Result
): SafeGuard => {
  return {
    admin: safeCreated.admin,
    rolManagerAddress: safeCreated.rolManagerAddress,
    safeName: safeCreated.safeName,
    timelockAddress: safeCreated.timelockAddress,
  };
};
