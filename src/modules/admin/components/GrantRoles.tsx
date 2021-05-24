import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { Text, Flex, FlexProps, HStack, Icon } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

// admin
import { InitialValuesRoles } from "modules/admin/lib/types";
import RoleTypesInfo from "modules/admin/components/RoleTypesInfo";
import GrantRoleForm from "modules/admin/components/GrantRoleForm";

type Props = {
  values: InitialValuesRoles;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  isSubmitting: boolean;
  errors: FormikErrors<InitialValuesRoles>;
  touched: FormikTouched<InitialValuesRoles>;
};

const GrantRoles: FC<Props & FlexProps> = ({
  values,
  errors,
  touched,
  handleChange,
  submitForm,
  isSubmitting,
  ...flexProps
}) => {
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
        <GrantRoleForm
          values={values}
          submitForm={submitForm}
          errors={errors}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
          touched={touched}
        />
      </Flex>
      <RoleTypesInfo />
    </Flex>
  );
};

export default GrantRoles;
