import { FC } from "react";
import { Link as ReachLink } from "@reach/router";
import { FormikErrors, FormikTouched } from "formik";
import { Button, Text, Stack, Flex, FlexProps } from "@chakra-ui/react";

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

const SendFundsCard: FC<Props & FlexProps> = ({
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
      <Text color="gray.800" flex={1} mb={1} textStyle="h5">
        Fund the FailSafe
      </Text>
      <Text color="gray.500" mb={2} textStyle="body.regular.lg">
        Only UNI tokens currently
      </Text>

      <Stack spacing={4} mt={3}>
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
      </Stack>
    </Flex>
  );
};

export default SendFundsCard;
