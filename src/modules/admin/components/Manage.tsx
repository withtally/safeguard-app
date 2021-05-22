import { FC } from "react";
import { CircularProgress, HStack, Text, Flex } from "@chakra-ui/react";

// common
import { useTransactions } from "modules/common/hooks/useTransactions";
import { useFundInformation } from "modules/common/hooks/useFundInformation";

// admin
import { useManageFunds } from "modules/admin/hooks/useManageFunds";
import AdminTransactionsTable from "modules/admin/components/AdminTransactionsTable";
import FundInfoCard from "modules/admin/components/FundInfoCard";
import SendFundsCard from "modules/admin/components/SendFundsCard";
import { FundManagementSteps } from "modules/admin/lib/constants";

const Manage: FC = () => {
  // custom hooks
  const { values, handleChange, submitForm, isSubmitting, errors, touched } =
    useManageFunds();

  const {
    transactions,
    cancelTransaction,
    isSubmitting: isSubmittingTransactions,
  } = useTransactions();

  const { fundBalance, timelockAddress } = useFundInformation();

  return (
    <Flex direction="column">
      <HStack align="center" mt={5} spacing={10} as="section" w="full">
        <FundInfoCard
          balance={fundBalance}
          timelockAddress={timelockAddress}
          processFlowSteps={FundManagementSteps}
        />
        <SendFundsCard
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

        {isSubmittingTransactions ? (
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
              <AdminTransactionsTable
                transactions={transactions}
                cancelTransaction={cancelTransaction}
              />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Manage;
