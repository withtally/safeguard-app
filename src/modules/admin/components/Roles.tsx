import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

// admin
import ManageGrantedRoles from 'modules/admin/components/ManageGrantedRoles';
import GrantRoles from 'modules/admin/components/GrantRoles';

const Roles: FC = () => {
  return (
    <Flex direction="column" w="full">
      <GrantRoles />
      <ManageGrantedRoles />
    </Flex>
  );
};

export default Roles;
