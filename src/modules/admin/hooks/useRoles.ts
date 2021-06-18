import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useParams } from '@reach/router';

// common
import { useSignedContract } from 'modules/common/hooks/useSignedContract';
import { ROLES_HASHES } from 'modules/common/lib/constants';
import { useWeb3 } from 'modules/common/hooks/useWeb3';
import { useUserContractRoles } from 'modules/common/hooks/useUserContractRoles';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';

// admin
import { GrantedRole } from 'modules/admin/lib/types';

type Values = {
  grantedRoles: GrantedRole[] | undefined;
  revokeRole: (role: string, address: string) => Promise<void>;
  revokingRole: boolean;
};

export const useRoles = (): Values => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // react hooks
  const [grantedRoles, setGrantedRoles] = useState<GrantedRole[]>();
  const [revokingRole, setRevokingRole] = useState(false);

  // chakra hooks
  const toast = useToast();

  // custom hooks
  const { signedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });
  const { web3 } = useWeb3();
  const { hasAdminRole } = useUserContractRoles();

  const getGrantedRoles = async () => {
    const { proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
    const proposersCount = await signedContract?.getRoleMemberCount(proposerRole);
    const executersCount = await signedContract?.getRoleMemberCount(executorRole);

    const cancelersCount = await signedContract?.getRoleMemberCount(cancelerRole);

    const members = [];
    for (let i = 0; i < proposersCount; ++i) {
      const proposerAddress = (await signedContract?.getRoleMember(proposerRole, i)) as string;
      members.push({
        address: proposerAddress.toLowerCase(),
        roleId: proposerRole,
      });
    }

    for (let i = 0; i < executersCount; ++i) {
      const executerAddress = (await signedContract?.getRoleMember(executorRole, i)) as string;
      members.push({
        address: executerAddress.toLowerCase(),
        roleId: executorRole,
      });
    }

    for (let i = 0; i < cancelersCount; ++i) {
      const cancelerAddress = (await signedContract?.getRoleMember(cancelerRole, i)) as string;
      members.push({
        address: cancelerAddress.toLowerCase(),
        roleId: cancelerRole,
      });
    }

    setGrantedRoles(members);
  };

  useEffect(() => {
    if (signedContract) getGrantedRoles();
  }, []);

  useEffect(() => {
    if (!signedContract) return;

    signedContract.on('RoleGranted', (event) => {
      getGrantedRoles();
    });

    signedContract.on('RoleRevoked', (event) => {
      getGrantedRoles();
    });
    return () => {
      signedContract.removeAllListeners('RoleGranted');
      signedContract.removeAllListeners('RoleRevoked');
    };
  });

  // handlers
  const revokeRole = async (role: string, address: string) => {
    if (!hasAdminRole) {
      toast({
        title: 'Error',
        description: "You don't have the role needed for this action",
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      setRevokingRole(true);
      const transferTx = await signedContract?.revokeRole(role, address);
      const receipt = await web3?.waitForTransaction(transferTx.hash, 3);
      setRevokingRole(false);
      toast({
        title: 'Success',
        description: 'Role revoked!',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log('🚀 ~  ~ error', error);
    }
  };

  return {
    grantedRoles,
    revokeRole,
    revokingRole,
  };
};
