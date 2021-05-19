import { FC } from "react";
import { CircularProgress, HStack, Text, Flex } from "@chakra-ui/react";

// admin
import { useRoles } from "modules/admin/hooks/useRoles";
import AdminRolesTable from "modules/admin/components/AdminRolesTable";
import GrantRoleCard from "modules/admin/components/GrantRoleCard";
import RolesInfoCard from "modules/admin/components/RolesInfoCard";

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
    <Flex direction="column">
      <HStack align="center" mt={5} spacing={10} as="section" w="full">
        <RolesInfoCard />
        <GrantRoleCard
          values={values}
          errors={errors}
          touched={touched}
          submitForm={submitForm}
          handleChange={handleChange}
          isSubmitting={formSubmitting}
        />
      </HStack>

      <Flex
        as="section"
        borderRadius="sm"
        direction="column"
        mb={20}
        mt={12}
        w="full"
      >
        <Text as="h4" color="purple.900" mb={1} textStyle="h4">
          Granted Roles
        </Text>
        <Text color="gray.500" mb={8} textStyle="body.regular.lg">
          List of roles with management feature
        </Text>
        {formSubmitting ? (
          <Flex
            align="center"
            border="gray.dark"
            minH="22.813rem"
            bg="white"
            justify="center"
            direction="column"
          >
            <CircularProgress isIndeterminate color="purple.300" />
          </Flex>
        ) : (
          <Flex border="gray.dark" bg="white" direction="column">
            {grantedRoles && (
              <AdminRolesTable
                grantedRoles={grantedRoles}
                revokeRole={revokeRole}
              />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Roles;
