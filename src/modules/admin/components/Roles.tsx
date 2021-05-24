import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";

// admin
import ManageGrantedRoles from "modules/admin/components/ManageGrantedRoles";
import GrantRoles from "modules/admin/components/GrantRoles";

const Roles: FC = () => {
  return (
    <Flex direction="column" w="full">
      <PageHeader title="Roles" />
      <GrantRoles />
      <ManageGrantedRoles />
    </Flex>
  );
};

export default Roles;
