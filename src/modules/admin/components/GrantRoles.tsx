import { FC } from 'react';
import { Text, Flex, FlexProps, HStack, Icon } from '@chakra-ui/react';
import { IoAddCircleOutline } from 'react-icons/io5';

// common
import InstructionList from 'modules/common/components/InstructionList';

// admin
import GrantRoleForm from 'modules/admin/components/GrantRoleForm';
import { ROLE_TYPES_INFO } from 'modules/admin/lib/constants';

const GrantRoles: FC<FlexProps> = ({ ...flexProps }) => {
  return (
    <Flex
      as="article"
      bg="white"
      borderRadius={4}
      direction="column"
      mt={6}
      shadow="gray.card"
      w="full"
      {...flexProps}
    >
      <Flex p={6} direction="column">
        <HStack spacing={1.5} mb={9}>
          <Icon as={IoAddCircleOutline} w={6} h={6} />
          <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
            Grant role to address
          </Text>
        </HStack>
        <GrantRoleForm />
      </Flex>
      <InstructionList title="Types of roles" instructions={ROLE_TYPES_INFO} />
    </Flex>
  );
};

export default GrantRoles;
