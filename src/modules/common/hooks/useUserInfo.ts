import { useState, useEffect } from "react";

// common
import { Routes } from "modules/common/lib/types";
import { ROLES_HASHES } from "modules/common/lib/constants";
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { useWeb3 } from "modules/common/hooks/useWeb3";

export const useUserInfo = () => {
  // react hooks
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userIsManager, setUserIsManager] = useState(false);
  const [userRole, setUserRole] = useState<keyof Routes | undefined>();

  // custom hooks
  const { signerAddress } = useWeb3();
  const { signedContract } = useSignedRolManagerContract();

  useEffect(() => {
    const getUserRole = async () => {
      const { adminRole, proposerRole, executorRole } = ROLES_HASHES;
      const admin = await signedContract?.hasRole(adminRole, signerAddress);

      if (Boolean(admin)) {
        setUserIsAdmin(admin);
        return setUserRole("admin");
      }

      const proposer = await signedContract?.hasRole(
        proposerRole,
        signerAddress
      );

      const executor = await signedContract?.hasRole(
        executorRole,
        signerAddress
      );

      if (Boolean(proposer) || Boolean(executor)) {
        setUserIsManager(true);
        return setUserRole("manager");
      }
    };

    if (signerAddress) getUserRole();
  }, [signerAddress, signedContract]);

  return {
    userRole,
    userIsManager,
    userIsAdmin,
  };
};
