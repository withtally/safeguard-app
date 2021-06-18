import { FC } from 'react';
import { Stack, Text } from '@chakra-ui/react';

// common
import { useUserContractRoles } from 'modules/common/hooks/useUserContractRoles';
import RoleTag from 'modules/common/components/RoleTag';

const SafeGuardViewRoleList: FC = () => {
  const { roles } = useUserContractRoles();

  return (
    <Stack isInline spacing={3} mb={5} align="center">
      <Text textStyle="h5">Assigned roles</Text>
      <Stack isInline spacing={4}>
        {roles.map((role) => (
          <RoleTag key={role} role={role} size="sm" />
        ))}
      </Stack>
    </Stack>
  );
};

export default SafeGuardViewRoleList;
