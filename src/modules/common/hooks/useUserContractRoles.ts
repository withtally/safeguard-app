import { useState, useEffect, useMemo } from 'react';
import { useParams } from '@reach/router';

// common
import { ROLES_HASHES } from 'modules/common/lib/constants';
import { useWeb3 } from 'modules/common/hooks/useWeb3';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';
import { Role } from 'modules/common/lib/types';
import { useSignedContract } from 'modules/common/hooks/useSignedContract';

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

  const { signedContract: signedRolContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });

  const hasSignerAddress = useMemo(() =>  signerAddress !== '' && signerAddress !== null && signerAddress !== undefined, [signerAddress])

  useEffect(() => {
    const getUserRole = async () => {
      const { adminRole, proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
      const admin = await signedRolContract?.hasRole(adminRole, signerAddress);

      const proposer = await signedRolContract?.hasRole(proposerRole, signerAddress);

      const executor = await signedRolContract?.hasRole(executorRole, signerAddress);

      const canceler = await signedRolContract?.hasRole(cancelerRole, signerAddress);

      setHasAdminRole(Boolean(admin));
      setHasProposerRole(Boolean(proposer));
      setHasExecutorRole(Boolean(executor));
      setHasCancelerRole(Boolean(canceler));

      const userRoles = [
        { name: 'admin', active: Boolean(admin) },
        { name: 'proposer', active: Boolean(proposer) },
        { name: 'executer', active: Boolean(executor) },
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

    if (signedRolContract && hasSignerAddress) getUserRole();
  }, [signerAddress, signedRolContract]);

  return {
    hasAdminRole,
    hasProposerRole,
    hasExecutorRole,
    hasCancelerRole,
    roles,
  };
};
