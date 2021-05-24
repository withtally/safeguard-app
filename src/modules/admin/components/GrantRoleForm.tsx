import { FC } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { FormikErrors, FormikTouched } from "formik";

// common
import FormInput from "modules/common/components/FormInput";
import FormSelect from "modules/common/components/FormSelect";

// admin
import { ROLES } from "modules/admin/lib/constants";
import { InitialValuesRoles } from "modules/admin/lib/types";

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

const GrantRoleForm: FC<Props> = ({
  values,
  touched,
  handleChange,
  errors,
  submitForm,
  isSubmitting,
}) => {
  return (
    <form id="grantRoleForm">
      <HStack spacing={4} mb={10} align="end" w="full">
        <HStack spacing={4} align="center" w="xl">
          <FormSelect
            id="role"
            name="role"
            label="Role"
            value={values.role}
            placeholder="Select role"
            onChange={handleChange}
            w={44}
          >
            {ROLES.map((rol) => (
              <option value={rol.id}>{rol.label}</option>
            ))}
          </FormSelect>
          <FormInput
            name="address"
            id="address"
            label="Address"
            placeholder="Enter an ETH address"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
          />
        </HStack>
        <Button
          onClick={submitForm}
          size="md"
          variant="primary"
          loadingText="Minning"
          isLoading={isSubmitting}
        >
          Grant role
        </Button>
      </HStack>
    </form>
  );
};

export default GrantRoleForm;
