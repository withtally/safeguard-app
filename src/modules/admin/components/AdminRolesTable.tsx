import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// admin
import { ROLES } from "modules/admin/lib/constants";
import { GrantedRole } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  grantedRoles: GrantedRole[];
  revokeRole: (role: string, address: string) => Promise<void>;
};

const AdminRolesTable: FC<Props> = ({ grantedRoles, revokeRole }) => {
  return (
    <Table variant="simple" size="md">
      <Thead>
        <Tr>
          <Th>Address</Th>
          <Th>Role</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {grantedRoles.map((role) => {
          const roleName = ROLES.find((item) => item.id === role.roleId)?.label;
          return (
            <Tr>
              <Td>{role.address}</Td>
              <Td>{roleName}</Td>
              <Td>
                <Button
                  size="lg"
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
  );
};

export default AdminRolesTable;
