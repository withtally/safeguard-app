import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useParams } from '@reach/router';

// common
import { useSignedContract } from 'modules/common/hooks/useSignedContract';
import { ROLES_HASHES } from 'modules/common/lib/constants';
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
  const [grantedRoles, setGrantedRoles] = useState<GrantedRole[]>([]);
  const [revokingRole, setRevokingRole] = useState(false);

  // chakra hooks
  const toast = useToast();

  // custom hooks
  const { signedContract: safeGuardSignedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });

  const { hasAdminRole } = useUserContractRoles();

  useEffect(() => {
    const getGrantedRoles = async () => {
      const { proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
      const proposersCount = await safeGuardSignedContract?.getRoleMemberCount(proposerRole);
      const executersCount = await safeGuardSignedContract?.getRoleMemberCount(executorRole);
  
      const cancelersCount = await safeGuardSignedContract?.getRoleMemberCount(cancelerRole);
  
      const members = [];
      for (let i = 0; i < proposersCount; ++i) {
      
        const proposerAddress = (await safeGuardSignedContract?.getRoleMember(proposerRole, i)) as string;
        members.push({
          address: proposerAddress.toLowerCase(),
          roleId: proposerRole,
        });
      }
  
      for (let i = 0; i < executersCount; ++i) {
        const executerAddress = (await safeGuardSignedContract?.getRoleMember(executorRole, i)) as string;
        members.push({
          address: executerAddress.toLowerCase(),
          roleId: executorRole,
        });
      }
  
      for (let i = 0; i < cancelersCount; ++i) {
        const cancelerAddress = (await safeGuardSignedContract?.getRoleMember(cancelerRole, i)) as string;
        members.push({
          address: cancelerAddress.toLowerCase(),
          roleId: cancelerRole,
        });
      }

      setGrantedRoles(members);
    };

    if (safeGuardSignedContract) getGrantedRoles();
  }, [safeGuardSignedContract]);

  useEffect(() => {
    if (!safeGuardSignedContract) return;

    safeGuardSignedContract.on('RoleGranted', (event) => {
      event.removeListener(); 

      const newRoleAdded = {
      
        address: event.account.toLowerCase(),
        roleId: event.role,
      };

      setGrantedRoles([...grantedRoles, newRoleAdded]);
    });

    safeGuardSignedContract.on('RoleRevoked', (event) => {
      event.removeListener(); 

      const newMembers = grantedRoles.filter(item => item.address === event.account && item.roleId === event.role)

      setGrantedRoles(newMembers)
    });
  
  }, [safeGuardSignedContract]);

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
      const transferTx = await safeGuardSignedContract?.revokeRole(role, address);
      const receipt = await transferTx.wait();

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
