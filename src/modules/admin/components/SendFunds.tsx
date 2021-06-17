import { FC } from "react";
import { Text, Flex, FlexProps, HStack, Icon, Button } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

// common
import FormAmountInput from "modules/common/components/FormAmountInput";

// admin
import { useManageFunds } from "modules/admin/hooks/useManageFunds";
import { FundManagementSteps } from "modules/admin/lib/constants";
import InstructionList from "modules/common/components/InstructionList";

const SendFunds: FC<FlexProps> = ({ ...flexProps }) => {
  // custom hooks
  const { values, handleChange, submitForm, isSubmitting, errors, touched } =
    useManageFunds();

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
            Fund the SafeGuard
          </Text>
        </HStack>

        <HStack align="center" spacing={3}>
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
            h="6.125rem"
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
      <InstructionList
        title="Process flow"
        instructions={FundManagementSteps}
      />
    </Flex>
  );
};

export default SendFunds;
