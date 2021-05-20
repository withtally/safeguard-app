import { FC } from "react";
import { Link as ReachLink } from "@reach/router";
import { FormikErrors, FormikTouched } from "formik";
import { Button, Text, Stack, Flex, FlexProps } from "@chakra-ui/react";

// common
import FormInput from "modules/common/components/FormInput";
import FormSelect from "modules/common/components/FormSelect";

// admin
import { InitialValuesRoles } from "modules/admin/lib/types";
import { ROLES } from "modules/admin/lib/constants";

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

const GrantRoleCard: FC<Props & FlexProps> = ({
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
      p={5}
      shadow="gray.card"
      w="full"
      {...flexProps}
    >
      <Text color="gray.800" flex={1} mb={4} textStyle="h5">
        Grant role to address
      </Text>

      <Stack spacing={4} mt={3}>
        <FormSelect
          id="role"
          name="role"
          label="Role"
          value={values.role}
          placeholder=""
          onChange={handleChange}
        >
          {ROLES.map((rol) => (
            <option value={rol.id}>{rol.label}</option>
          ))}
        </FormSelect>
        <FormInput
          name="address"
          id="address"
          label="Address"
          placeholder=""
          values={values}
          errors={errors}
          touched={touched}
          onChange={handleChange}
        />
        <Button
          onClick={submitForm}
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          maxW={24}
        >
          Grant role
        </Button>
      </Stack>
    </Flex>
  );
};

export default GrantRoleCard;
