import { utils } from "ethers";

// failSafe
import { SafeGuard } from "modules/safeGuard/lib/types";

export const parseSafeGuardCreations = (
  safeCreated: utils.Result
): SafeGuard => {
  return {
    admin: safeCreated.admin,
    safeGuardAddress: safeCreated.safeGuardAddress,
    safeGuardName: safeCreated.safeGuardName,
    timelockAddress: safeCreated.timelockAddress,
  };
};
