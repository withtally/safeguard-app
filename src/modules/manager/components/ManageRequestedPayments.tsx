import { FC } from 'react';
import { HStack, Text, Flex, Stack, Icon } from '@chakra-ui/react';
import { IoListOutline } from 'react-icons/io5';

// manager
import ManagerTransactionsTable from 'modules/manager/components/ManagerTransactionsTable';

// admin
import { Transaction } from 'modules/admin/lib/types';

type Props = {
  transactions?: Transaction[];
  executeTransaction: (transaction: Transaction) => Promise<void>;
};

const ManageRequestedPayments: FC<Props> = ({ transactions, executeTransaction }) => {
  return (
    <Stack
      as="section"
      borderRadius="sm"
      spacing={6}
      mb={20}
      mt={12}
      p={6}
      w="full"
      shadow="gray.card"
    >
      <HStack spacing={1.5}>
        <Icon as={IoListOutline} w={6} h={6} />
        <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
          Manage requested payments
        </Text>
      </HStack>
      <Flex border="gray.dark" bg="white" direction="column">
        {transactions && (
          <ManagerTransactionsTable
            transactions={transactions}
            executeTransaction={executeTransaction}
          />
        )}
      </Flex>
    </Stack>
  );
};

export default ManageRequestedPayments;
