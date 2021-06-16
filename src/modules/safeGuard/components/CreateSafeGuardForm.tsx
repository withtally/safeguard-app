import { FC } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { FormikErrors, FormikTouched } from "formik";

// common
import FormInput from "modules/common/components/FormInput";
import FormSelect from "modules/common/components/FormSelect";

// failsafe
import { InitialValuesCreateSafeGuard } from "modules/safeGuard/lib/types";

type Props = {
  values: InitialValuesCreateSafeGuard;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  formSubmitting: boolean;
  errors: FormikErrors<InitialValuesCreateSafeGuard>;
  touched: FormikTouched<InitialValuesCreateSafeGuard>;
};

const CreateSafeGuardForm: FC<Props> = ({
  values,
  errors,
  touched,
  handleChange,
  submitForm,
  formSubmitting,
}) => {
  return (
    <form id="grantRoleForm">
      <HStack spacing={4} mb={10} w="full">
        <HStack spacing={4} w="xl" align="center">
          <FormSelect
            id="delay"
            name="delay"
            label="Timelock Delay"
            value={values.delay}
            placeholder="Select delay"
            onChange={handleChange}
            errors={errors}
            touched={touched}
            w={52}
            h="6.125rem"
          >
            <option key="1" value="40">
              1 day
            </option>
            <option key="2" value="60">
              2 days
            </option>
            <option key="3" value="80">
              3 days
            </option>
          </FormSelect>
          <FormInput
            name="safeGuardName"
            id="safeGuardName"
            label="SafeGuard name"
            placeholder="Enter a name for the new SafeGuard"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            h="6.125rem"
          />
        </HStack>
        <Button
          onClick={submitForm}
          size="md"
          variant="primary"
          isLoading={formSubmitting}
        >
          Create
        </Button>
      </HStack>
    </form>
  );
};

export default CreateSafeGuardForm;
