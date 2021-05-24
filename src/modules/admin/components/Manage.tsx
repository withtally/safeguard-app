import { FC } from "react";
import { CircularProgress, HStack, Text, Flex } from "@chakra-ui/react";

// common
import { useTransactions } from "modules/common/hooks/useTransactions";
import { useFundInformation } from "modules/common/hooks/useFundInformation";
import PageHeader from "modules/common/components/PageHeader";
import FundInformationCard from "modules/common/components/FundInformationCard";

// admin
import { useManageFunds } from "modules/admin/hooks/useManageFunds";
import SendFunds from "modules/admin/components/SendFunds";
import ManageRequestedPayments from "modules/admin/components/ManageRequestedPayments";

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
    <Flex direction="column" w="full">
      <PageHeader title="Manage" />
      <FundInformationCard
        balance={fundBalance}
        timelockAddress={timelockAddress}
      />
      <SendFunds
        values={values}
        submitForm={submitForm}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
      />

      <ManageRequestedPayments
        transactions={transactions}
        cancelTransaction={cancelTransaction}
        formSubmitting={isSubmittingTransactions}
      />
    </Flex>
  );
};

export default Manage;
