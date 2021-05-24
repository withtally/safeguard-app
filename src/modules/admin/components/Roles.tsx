import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";

// admin
import { useRoles } from "modules/admin/hooks/useRoles";
import ManageGrantedRoles from "modules/admin/components/ManageGrantedRoles";
import GrantRoles from "modules/admin/components/GrantRoles";

const Roles: FC = () => {
  const {
    handleChange,
    values,
    submitForm,
    grantedRoles,
    revokeRole,
    formSubmitting,
    errors,
    touched,
  } = useRoles();

  return (
    <Flex direction="column" w="full">
      <PageHeader title="Roles" />
      <GrantRoles
        values={values}
        handleChange={handleChange}
        submitForm={submitForm}
        errors={errors}
        touched={touched}
        isSubmitting={formSubmitting}
      />
      <ManageGrantedRoles
        formSubmitting={formSubmitting}
        revokeRole={revokeRole}
        grantedRoles={grantedRoles}
      />
    </Flex>
  );
};

export default Roles;
