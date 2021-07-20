import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useParams } from '@reach/router';
import {Contract} from 'ethers';

// common
import { useSignedContract } from 'modules/common/hooks/useSignedContract';
import { ROLES_HASHES } from 'modules/common/lib/constants';
import { useWeb3 } from 'modules/common/hooks/useWeb3';
import { useUserContractRoles } from 'modules/common/hooks/useUserContractRoles';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';
import {useReadOnlyProvider} from 'modules/common/hooks/useReadOnlyProvider';

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
  const {readOnlyProvider} = useReadOnlyProvider();

  const { signedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });
  const { web3 } = useWeb3();
  const { hasAdminRole } = useUserContractRoles();

  // constant
  const safeGuardContract = new Contract(
    safeGuardAddress,
    SAFEGUARD_JSON.abi,
    readOnlyProvider
  );

  const getGrantedRoles = async () => {
    const { proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
    const proposersCount = await safeGuardContract.getRoleMemberCount(proposerRole);
    const executersCount = await safeGuardContract.getRoleMemberCount(executorRole);

    const cancelersCount = await safeGuardContract.getRoleMemberCount(cancelerRole);

    const members = [];
    for (let i = 0; i < proposersCount; ++i) {
      const proposerAddress = (await safeGuardContract.getRoleMember(proposerRole, i)) as string;
      members.push({
        address: proposerAddress.toLowerCase(),
        roleId: proposerRole,
      });
    }

    for (let i = 0; i < executersCount; ++i) {
      const executerAddress = (await safeGuardContract.getRoleMember(executorRole, i)) as string;
      members.push({
        address: executerAddress.toLowerCase(),
        roleId: executorRole,
      });
    }

    for (let i = 0; i < cancelersCount; ++i) {
      const cancelerAddress = (await safeGuardContract.getRoleMember(cancelerRole, i)) as string;
      members.push({
        address: cancelerAddress.toLowerCase(),
        roleId: cancelerRole,
      });
    }

    setGrantedRoles(members);
  };

  useEffect(() => {
    if (safeGuardContract) getGrantedRoles();
  }, []);

  useEffect(() => {
    if (!safeGuardContract) return;

    safeGuardContract.on('RoleGranted', (event) => {
      getGrantedRoles();
    });

    safeGuardContract.on('RoleRevoked', (event) => {
      getGrantedRoles();
    });
    return () => {
      safeGuardContract.removeAllListeners('RoleGranted');
      safeGuardContract.removeAllListeners('RoleRevoked');
    };
  }, []);

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
