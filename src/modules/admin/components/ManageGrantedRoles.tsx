import { FC } from 'react';
import { HStack, Text, Flex, Stack, Icon } from '@chakra-ui/react';
import { IoSettingsOutline } from 'react-icons/io5';

// admin
import AdminRolesTable from 'modules/admin/components/AdminRolesTable';
import { useRoles } from 'modules/admin/hooks/useRoles';

const ManageGrantedRoles: FC = () => {
  // custom hooks
  const { grantedRoles, revokeRole } = useRoles();

  return (
    <Stack
      as="section"
      borderRadius="sm"
      spacing={6}
      mb={20}
      mt={12}
      p={6}
      w="full"
      shadow="gray.card"
    >
      <HStack spacing={1.5}>
        <Icon as={IoSettingsOutline} w={6} h={6} />
        <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
          Manage granted roles
        </Text>
      </HStack>
      <Flex border="gray.dark" bg="white" direction="column">
        {grantedRoles && <AdminRolesTable grantedRoles={grantedRoles} revokeRole={revokeRole} />}
      </Flex>
    </Stack>
  );
};

export default ManageGrantedRoles;
