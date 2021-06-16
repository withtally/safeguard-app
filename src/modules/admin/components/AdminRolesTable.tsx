import { FC, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common
import Avatar from "modules/common/components/Avatar";
import { useUserInformation } from "modules/common/hooks/useUserInformation";
import { getUsername, getProfileImage } from "modules/common/lib/helpers";

// admin
import { ROLES } from "modules/admin/lib/constants";
import { GrantedRole } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  grantedRoles: GrantedRole[];
  revokeRole: (role: string, address: string) => Promise<void>;
};

const AdminRolesTable: FC<Props> = ({ grantedRoles, revokeRole }) => {
  // constants
  const addresses = useMemo(
    () => grantedRoles.map((role) => role.address),
    [grantedRoles]
  );
  const hasRows = Boolean(grantedRoles.length);

  // custom hooks
  const { usersInformation } = useUserInformation({
    addresses,
  });

  return (
    <Flex align="stretch" direction="column" w="full">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {grantedRoles.map((role, index) => {
            const roleName = ROLES.find(
              (item) => item.id === role.roleId
            )?.label;
            const profileImage = getProfileImage(
              usersInformation,
              role.address
            );
            const username = getUsername(usersInformation, role.address);

            return (
              <Tr key={`${role.address}-${index}`}>
                <Td>
                  <HStack spacing={2}>
                    <Avatar address={role.address} src={profileImage} />
                    <Text color="gray.500" textStyle="body.regular.md">
                      {username}
                    </Text>
                  </HStack>
                </Td>
                <Td>{roleName}</Td>
                <Td>
                  <Button
                    size="md"
                    variant="error"
                    onClick={() => revokeRole(role.roleId, role.address)}
                  >
                    Revoke
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {!hasRows ? (
        <Flex align="center" bg="gray.50" h={16} justify="center" w="full">
          <Text color="gray.600" textStyle="body.bold.sm">
            No rows to show
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default AdminRolesTable;
