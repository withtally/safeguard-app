import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common

import FundInformationCard from "modules/common/components/FundInformationCard";

// manager
import ManageRequestedPayments from "modules/manager/components/ManageRequestedPayments";
import RequestPayment from "modules/manager/components/RequestPayment";
import { usePayments } from "modules/manager/hooks/usePayments";

// admin
import { Transaction } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  transactions?: Transaction[];
};

const Payments: FC<Props> = ({ transactions }) => {
  // custom hooks
  const {
    executeTransaction,
    formSubmitting,
    values,
    handleChange,
    submitForm,
    errors,
    touched,
  } = usePayments();

  return (
    <Flex direction="column" w="full">
      <FundInformationCard />
      <RequestPayment
        values={values}
        errors={errors}
        touched={touched}
        submitForm={submitForm}
        handleChange={handleChange}
        isSubmitting={formSubmitting}
      />
      <ManageRequestedPayments
        transactions={transactions}
        executeTransaction={executeTransaction}
      />
    </Flex>
  );
};

export default Payments;
