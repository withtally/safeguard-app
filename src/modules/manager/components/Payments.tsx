import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common
import { useTransactions } from "modules/common/hooks/useTransactions";
import FundInformationCard from "modules/common/components/FundInformationCard";

// manager
import ManageRequestedPayments from "modules/manager/components/ManageRequestedPayments";
import RequestPayment from "modules/manager/components/RequestPayment";
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

  return (
    <Flex direction="column" w="full">
      <PageHeader title="Payments" />
      <FundInformationCard />
      <RequestPayment
        values={values}
        errors={errors}
        touched={touched}
        submitForm={submitForm}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
      <ManageRequestedPayments
        transactions={transactions}
        executeTransaction={executeTransaction}
      />
    </Flex>
  );
};

export default Payments;
