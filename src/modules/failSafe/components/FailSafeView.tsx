import { FC } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";
import { useTransactions } from "modules/common/hooks/useTransactions";

// admin
import Roles from "modules/admin/components/Roles";
import Manage from "modules/admin/components/Manage";

// manager
import Payments from "modules/manager/components/Payments";

const FailSafeView: FC = () => {
  // custom hooks
  const { transactions } = useTransactions();

  return (
    <Flex direction="column" w="full">
      <PageHeader title="View FailSafe" />
      <Tabs>
        <TabList>
          <Tab>Roles</Tab>
          <Tab>Manage</Tab>
          <Tab>Payments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Roles />
          </TabPanel>
          <TabPanel>
            <Manage transactions={transactions} />
          </TabPanel>
          <TabPanel>
            <Payments transactions={transactions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default FailSafeView;
