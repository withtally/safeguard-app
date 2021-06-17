import { useState, useEffect } from "react";
import { useParams } from "@reach/router";

// common
import { ROLES_HASHES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import SAFEGUARD_JSON from "modules/common/lib/abis/SafeGuard.json";

type Values = {
  hasAdminRole: boolean;
  hasProposerRole: boolean;
  hasCancelerRole: boolean;
  hasExecutorRole: boolean;
};

export const useUserInfo = (): Values => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // react hooks
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [hasProposerRole, setHasProposerRole] = useState(false);
  const [hasExecutorRole, setHasExecutorRole] = useState(false);
  const [hasCancelerRole, setHasCancelerRole] = useState(false);

  // custom hooks
  const { signerAddress } = useWeb3();
  const { signedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });

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
