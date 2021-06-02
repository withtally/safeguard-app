import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

// common
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { ROLES_HASHES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";
import { useUserInfo } from "modules/common/hooks/useUserInfo";

// admin
import { GrantedRole } from "modules/admin/lib/types";

type Values = {
  grantedRoles: GrantedRole[] | undefined;
  revokeRole: (role: string, address: string) => Promise<void>;
  formSubmitting: boolean;
};

export const useRoles = (): Values => {
  // react hooks
  const [grantedRoles, setGrantedRoles] = useState<GrantedRole[]>();
  const [revokingRole, setRevokingRole] = useState(false);

  // chakra hooks
  const toast = useToast();

  // custom hooks
  const { signedContract } = useSignedRolManagerContract();
  const { web3 } = useWeb3();
  const { hasAdminRole } = useUserInfo();

  const getGrantedRoles = async () => {
    const { proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
    const proposersCount = await signedContract?.getRoleMemberCount(
      proposerRole
    );
    const executersCount = await signedContract?.getRoleMemberCount(
      executorRole
    );

    const cancelersCount = await signedContract?.getRoleMemberCount(
      cancelerRole
    );

    const members = [];
    for (let i = 0; i < proposersCount; ++i) {
      const proposerAddress = await signedContract?.getRoleMember(
        proposerRole,
        i
      );
      members.push({ address: proposerAddress, roleId: proposerRole });
    }

    for (let i = 0; i < executersCount; ++i) {
      const executerAddress = await signedContract?.getRoleMember(
        executorRole,
        i
      );
      members.push({ address: executerAddress, roleId: executorRole });
    }

    for (let i = 0; i < cancelersCount; ++i) {
      const cancelerAddress = await signedContract?.getRoleMember(
        executorRole,
        i
      );
      members.push({ address: cancelerAddress, roleId: cancelerRole });
    }

    setGrantedRoles(members);
  };

  useEffect(() => {
    if (signedContract) getGrantedRoles();
  }, []);

  useEffect(() => {
    if (!signedContract) return;

    signedContract.on("RoleGranted", (event) => {
      getGrantedRoles();
    });

    signedContract.on("RoleRevoked", (event) => {
      getGrantedRoles();
    });
    return () => {
      signedContract.removeAllListeners("RoleGranted");
      signedContract.removeAllListeners("RoleRevoked");
    };
  });

  // handlers
  const revokeRole = async (role: string, address: string) => {
    if (!hasAdminRole) {
      toast({
        title: "Error",
        description: "You don't have the role needed for this action",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setRevokingRole(true);
      const transferTx = await signedContract?.revokeRole(role, address);
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      setRevokingRole(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  return {
    grantedRoles,
    revokeRole,
    formSubmitting: revokingRole,
  };
};
