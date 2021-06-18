import { utils } from 'ethers';

// safeGuard
import { SafeGuard } from 'modules/safeGuard/lib/types';

export const parseSafeGuardCreations = (safeCreated: utils.Result): SafeGuard => {
  return {
    admin: safeCreated.admin.toLowerCase(),
    safeGuardAddress: safeCreated.safeGuardAddress,
    safeGuardName: safeCreated.safeName,
    timelockAddress: safeCreated.timelockAddress,
  };
};
