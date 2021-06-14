import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import FundInformationCard from "modules/common/components/FundInformationCard";

// admin
import SendFunds from "modules/admin/components/SendFunds";
import ManageRequestedPayments from "modules/admin/components/ManageRequestedPayments";
import { Transaction } from "modules/admin/lib/types";

type Props = {
  transactions?: Transaction[];
};

const Manage: FC<Props> = ({ transactions }) => {
  return (
    <Flex direction="column" w="full">
      <FundInformationCard />
      <SendFunds />
      <ManageRequestedPayments transactions={transactions} />
    </Flex>
  );
};

export default Manage;
