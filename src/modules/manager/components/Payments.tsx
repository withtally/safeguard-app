import { FC } from "react";
import { CircularProgress, HStack, Text, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common
import { useTransactions } from "modules/common/hooks/useTransactions";
import { useFundInformation } from "modules/common/hooks/useFundInformation";
import FundInformationCard from "modules/common/components/FundInformationCard";

// manager
import ManagerTransactionsTable from "modules/manager/components/ManagerTransactionsTable";
import { PaymentsFlowSteps } from "modules/manager/lib/constants";
import RequestPaymentCard from "modules/manager/components/RequestPaymentCard";
import PageHeader from "modules/common/components/PageHeader";

dayjs.extend(advancedFormat);

const Payments: FC = () => {
  // custom hooks
  const {
    transactions,
    executeTransaction,
    isSubmitting,
    values,
    handleChange,
    submitForm,
    errors,
    touched,
  } = useTransactions();

  const { fundBalance, timelockAddress } = useFundInformation();

  return (
    <Flex direction="column" w="full">
      <PageHeader title="Payments" />
      <FundInformationCard
        timelockAddress={timelockAddress}
        balance={fundBalance}
      />
      <HStack align="center" mt={5} spacing={10} as="section" w="full">
        <RequestPaymentCard
          values={values}
          errors={errors}
          touched={touched}
          submitForm={submitForm}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
        />
      </HStack>
      <Flex
        as="section"
        borderRadius="sm"
        direction="column"
        mb={20}
        mt={12}
        w="full"
      >
        <Text as="h4" color="purple.900" mb={1} textStyle="h4">
          Requested Payments
        </Text>
        <Text color="gray.500" mb={8} textStyle="body.regular.lg">
          Payments requests list with state
        </Text>

        {isSubmitting ? (
          <Flex
            align="center"
            border="gray.dark"
            minH="22.813rem"
            bg="white"
            justify="center"
            direction="column"
          >
            <CircularProgress isIndeterminate color="purple.300" />
          </Flex>
        ) : (
          <Flex border="gray.dark" bg="white" direction="column">
            {transactions && (
              <ManagerTransactionsTable
                transactions={transactions}
                executeTransaction={executeTransaction}
              />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Payments;
