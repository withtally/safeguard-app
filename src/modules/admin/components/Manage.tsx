import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";
import FundInformationCard from "modules/common/components/FundInformationCard";

// admin
import SendFunds from "modules/admin/components/SendFunds";
import ManageRequestedPayments from "modules/admin/components/ManageRequestedPayments";

const Manage: FC = () => {
  return (
    <Flex direction="column" w="full">
      <PageHeader title="Manage" />
      <FundInformationCard />
      <SendFunds />
      <ManageRequestedPayments />
    </Flex>
  );
};

export default Manage;
