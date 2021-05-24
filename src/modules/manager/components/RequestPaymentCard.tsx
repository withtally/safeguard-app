import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { Button, Text, Stack, Flex, FlexProps } from "@chakra-ui/react";

// common
import FormInput from "modules/common/components/FormInput";

// manager
import { InitialValuesRequestFunds } from "modules/manager/lib/types";

type Props = {
  values: InitialValuesRequestFunds;
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
  errors: FormikErrors<InitialValuesRequestFunds>;
  touched: FormikTouched<InitialValuesRequestFunds>;
};

const RequestPaymentCard: FC<Props & FlexProps> = ({
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
        Request payment
      </Text>

      <Stack spacing={4} mt={3}>
        <FormInput
          name="address"
          id="address"
          label="Address to receive the funds"
          placeholder=""
          values={values}
          errors={errors}
          touched={touched}
          onChange={handleChange}
        />
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
          variant="primary"
          maxW={32}
        >
          Request payment
        </Button>
      </Stack>
    </Flex>
  );
};

export default RequestPaymentCard;
