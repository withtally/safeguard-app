import { FC } from 'react';
import { Text, Flex, FlexProps, HStack, Icon, Button } from '@chakra-ui/react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FormikErrors, FormikTouched } from 'formik';

// common
import FormAmountInput from 'modules/common/components/FormAmountInput';
import FormInput from 'modules/common/components/FormInput';
import InstructionList from 'modules/common/components/InstructionList';

// manager
import { InitialValuesRequestFunds } from 'modules/manager/lib/types';
import { PaymentsFlowSteps } from 'modules/manager/lib/constants';

type Props = {
  values: InitialValuesRequestFunds;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  isSubmitting: boolean;
  errors: FormikErrors<InitialValuesRequestFunds>;
  touched: FormikTouched<InitialValuesRequestFunds>;
};

const RequestPayment: FC<FlexProps & Props> = ({
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
            Request payment
          </Text>
        </HStack>

        <HStack align="center" spacing={3}>
          <FormInput
            name="address"
            id="address"
            label="Address to receive the funds"
            placeholder="Enter an ETH address"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            maxW="lg"
            h="6.125rem"
          />
          <FormAmountInput
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
          <FormInput
            name="description"
            id="description"
            label="Description"
            placeholder="Specify a description for the payment"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            maxW="xs"
            h="6.125rem"
          />
          <Button isLoading={isSubmitting} onClick={submitForm} variant="primary" size="md">
            Request payment
          </Button>
        </HStack>
      </Flex>
      <InstructionList title="Process flow" instructions={PaymentsFlowSteps} />
    </Flex>
  );
};

export default RequestPayment;
