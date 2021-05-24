import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { HStack, Button } from "@chakra-ui/react";

// common
import FormInput from "modules/common/components/FormInput";

// admin
import { InitialValuesSendValues } from "modules/admin/lib/types";

type Props = {
  values: InitialValuesSendValues;
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
  errors: FormikErrors<InitialValuesSendValues>;
  touched: FormikTouched<InitialValuesSendValues>;
};

const SendFundsForm: FC<Props> = ({
  values,
  errors,
  touched,
  handleChange,
  submitForm,
  isSubmitting,
}) => {
  return (
    <HStack spacing={3} mt={3}>
      <FormInput
        name="amount"
        id="amount"
        label="Amount"
        placeholder=""
        values={values}
        errors={errors}
        touched={touched}
        onChange={handleChange}
      />
      <Button
        isLoading={isSubmitting}
        onClick={submitForm}
        size="md"
        variant="primary"
        maxW={24}
      >
        Send Funds
      </Button>
    </HStack>
  );
};

export default SendFundsForm;
