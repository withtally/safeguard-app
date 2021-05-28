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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common
import Avatar from "modules/common/components/Avatar";
import {
  UsersInformation,
  useUserInformation,
} from "modules/common/hooks/useUserInformation";
import { getProfileImage, getUsername } from "modules/common/lib/helpers";

// admin
import { ROLES } from "modules/admin/lib/constants";
import { GrantedRole } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  grantedRoles: GrantedRole[];
  revokeRole: (role: string, address: string) => Promise<void>;
};

const AdminRolesTable: FC<Props> = ({ grantedRoles, revokeRole }) => {
  const hasRows = Boolean(grantedRoles.length);
  return (
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
          const roleName = ROLES.find((item) => item.id === role.roleId)?.label;

          return (
            <Tr key={`${role.address}-${index}`}>
              <Td>
                <HStack spacing={2}>
                  <Avatar address={role.address} />
                  <Text color="gray.500" textStyle="body.regular.md">
                    {role.address}
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
        {!hasRows ? (
          <Tr align="center" bg="gray.50" h={16} justify="center" w="full">
            <Td></Td>
            <Td>
              <Text color="gray.600" textStyle="body.bold.sm">
                No roles granted yet
              </Text>
            </Td>
            <Td></Td>
          </Tr>
        ) : null}
      </Tbody>
    </Table>
  );
};

export default AdminRolesTable;
