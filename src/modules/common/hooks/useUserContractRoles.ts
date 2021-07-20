import { useState, useEffect } from 'react';
import { useParams } from '@reach/router';
import {Contract} from 'ethers';

// common
import { ROLES_HASHES } from 'modules/common/lib/constants';
import { useWeb3 } from 'modules/common/hooks/useWeb3';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';
import { Role } from 'modules/common/lib/types';
import {useReadOnlyProvider} from 'modules/common/hooks/useReadOnlyProvider';

type Values = {
  hasAdminRole: boolean;
  hasProposerRole: boolean;
  hasCancelerRole: boolean;
  hasExecutorRole: boolean;
  roles: Role[];
};

export const useUserContractRoles = (): Values => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // react hooks
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [hasProposerRole, setHasProposerRole] = useState(false);
  const [hasExecutorRole, setHasExecutorRole] = useState(false);
  const [hasCancelerRole, setHasCancelerRole] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  // custom hooks
  const { signerAddress } = useWeb3();
  const {readOnlyProvider} = useReadOnlyProvider();

  const safeGuardContract = new Contract(
    safeGuardAddress,
    SAFEGUARD_JSON.abi,
    readOnlyProvider
  );

  useEffect(() => {
    const getUserRole = async () => {
      const { adminRole, proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
      const admin = await safeGuardContract?.hasRole(adminRole, signerAddress);

      const proposer = await safeGuardContract?.hasRole(proposerRole, signerAddress);

      const executor = await safeGuardContract?.hasRole(executorRole, signerAddress);

      const canceler = await safeGuardContract?.hasRole(cancelerRole, signerAddress);

      setHasAdminRole(Boolean(admin));
      setHasProposerRole(Boolean(proposer));
      setHasExecutorRole(Boolean(executor));
      setHasCancelerRole(Boolean(canceler));

      const userRoles = [
        { name: 'admin', active: Boolean(admin) },
        { name: 'proposer', active: Boolean(proposer) },
        { name: 'executor', active: Boolean(executor) },
        { name: 'canceler', active: Boolean(canceler) },
        {
          name: 'viewer',
          active: Boolean(!admin) && Boolean(!proposer) && Boolean(!executor) && Boolean(!canceler),
        },
      ];

      const userAssignedRoles = userRoles
        .filter((role) => role.active)
        .map((role) => role.name) as Role[];

      setRoles(userAssignedRoles);
    };

    if (signerAddress) getUserRole();
  }, [signerAddress]);

  return {
    hasAdminRole,
    hasProposerRole,
    hasExecutorRole,
    hasCancelerRole,
    roles,
  };
};
