import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import {
  Text,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

// common
import FormInput from "modules/common/components/FormInput";
import UniswapIcon from "modules/common/components/icons/UniswapIcon";

// admin
import { InitialValuesSendValues } from "modules/admin/lib/types";
import InstructionList from "modules/common/components/InstructionList";

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

const SendFunds: FC<Props & FlexProps> = ({
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
        <HStack spacing={1.5} mb={12}>
          <Icon as={IoAddCircleOutline} w={6} h={6} />
          <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
            Fund the Failsafe
          </Text>
        </HStack>

        <HStack align="end" spacing={3}>
          <Stack spacing={1}>
            <Text textStyle="label">Token</Text>
            <HStack px={2} w="5.188rem" h={10} spacing={1} border="gray.dark">
              <UniswapIcon w={5} h={5} />
              <Text textStyle="body.regular.md">UNI</Text>
            </HStack>
          </Stack>
          <FormInput
            name="amount"
            id="amount"
            label="Amount"
            placeholder="Enter an UNI amount of tokens"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            w={64}
          />
          <Button
            isLoading={isSubmitting}
            onClick={submitForm}
            size="md"
            variant="primary"
          >
            Send Funds
          </Button>
        </HStack>
      </Flex>
      <InstructionList title="Process flow" instructions={[]} />
    </Flex>
  );
};

export default SendFunds;
