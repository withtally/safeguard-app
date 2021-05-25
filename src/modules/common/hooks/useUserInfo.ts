import { useState, useEffect } from "react";

// common
import { ROLES_HASHES } from "modules/common/lib/constants";
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { useWeb3 } from "modules/common/hooks/useWeb3";

type Values = {
  hasAdminRole: boolean;
  hasProposerRole: boolean;
  hasCancelerRole: boolean;
  hasExecutorRole: boolean;
};

export const useUserInfo = (): Values => {
  // react hooks
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [hasProposerRole, setHasProposerRole] = useState(false);
  const [hasExecutorRole, setHasExecutorRole] = useState(false);
  const [hasCancelerRole, setHasCancelerRole] = useState(false);

  // custom hooks
  const { signerAddress } = useWeb3();
  const { signedContract } = useSignedRolManagerContract();

  useEffect(() => {
    const getUserRole = async () => {
      const { adminRole, proposerRole, executorRole, cancelerRole } =
        ROLES_HASHES;
      const admin = await signedContract?.hasRole(adminRole, signerAddress);

      const proposer = await signedContract?.hasRole(
        proposerRole,
        signerAddress
      );

      const executor = await signedContract?.hasRole(
        executorRole,
        signerAddress
      );

      const canceler = await signedContract?.hasRole(
        cancelerRole,
        signerAddress
      );

      setHasAdminRole(Boolean(admin));
      setHasProposerRole(Boolean(proposer));
      setHasExecutorRole(Boolean(executor));
      setHasCancelerRole(Boolean(canceler));
    };

    if (signerAddress) getUserRole();
  }, [signerAddress, signedContract]);

  return {
    hasAdminRole,
    hasProposerRole,
    hasExecutorRole,
    hasCancelerRole,
  };
};
