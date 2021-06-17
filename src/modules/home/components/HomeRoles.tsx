import { FC } from "react";
import {
  Text,
  Stack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// home
import { ROLES_INFORMATION } from "modules/home/lib/constants";

const HomeRoles: FC = () => {
  return (
    <Stack spacing={4} mb={14}>
      <Stack spacing={1} mb={4}>
        <Text as="h4" color="purple.800" textStyle="h4">
          Roles
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          These are the roles that exists in the SafeGuard app.
        </Text>
      </Stack>
      <Flex shadow="gray.card" bg="white" direction="column">
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>Role</Th>
              <Th>Description</Th>
              <Th>When can we assign it?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ROLES_INFORMATION.map(({ role, description, assignmentTime }) => (
              <Tr key={role}>
                <Td color="purple.500" textStyle="body.bold.lg">
                  {role}
                </Td>
                <Td color="gray.600" textStyle="body.regular.md">
                  {description}
                </Td>
                <Td color="gray.600" textStyle="body.regular.md">
                  {assignmentTime}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Stack>
  );
};

export default HomeRoles;
