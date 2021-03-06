import { FC, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Text, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useWeb3 } from 'modules/common/hooks/useWeb3';

// common
import { parseBigNumber } from 'modules/common/lib/helpers';
import StatusTag from 'modules/common/components/StatusTag';
import Avatar from 'modules/common/components/Avatar';
import { useUserInformation } from 'modules/common/hooks/useUserInformation';
import { getUsername, getProfileImage } from 'modules/common/lib/helpers';

// admin
import { Transaction } from 'modules/admin/lib/types';

// manager
import { getTransactionStatus } from 'modules/manager/lib/helpers';

dayjs.extend(advancedFormat);

type Props = {
  transactions: Transaction[];
  executeTransaction: (transaction: Transaction) => Promise<void>;
};

const ManagerTransactionsTable: FC<Props> = ({ transactions, executeTransaction }) => {
  // constants
  const addresses = useMemo(
    () => transactions.map((transaction) => transaction.transferTo),
    [transactions],
  );
  const hasRows = Boolean(transactions.length);

  // custom hooks
  const { openSelectWallet, isWeb3Ready } = useWeb3();
  const { usersInformation } = useUserInformation({
    addresses,
  });

  // handlers
  const handleExecutePayment = async (transaction: Transaction): Promise<void> => {
    if (isWeb3Ready) {
      await executeTransaction(transaction)
    } else {
      await openSelectWallet()
    }
  };


  return (
    <Flex align="stretch" direction="column" w="full">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Destination address</Th>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            <Th>Date payment unlocks</Th>
            <Th>Date payment expires</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction: Transaction, index: number) => {
            const status = getTransactionStatus(transaction);
            const etaMeet = transaction.eta <= dayjs().format('X');
            const btnDisabled = !transaction.currentlyQueued || !etaMeet || transaction.stale;

            const profileImage = getProfileImage(usersInformation, transaction.transferTo);
            const username = getUsername(usersInformation, transaction.transferTo, false);
            return (
              <Tr key={`${index}-${transaction.txHash}`}>
                <Td>
                  <HStack spacing={2}>
                    <Avatar address={transaction.transferTo} src={profileImage} />
                    <Text color="gray.500" textStyle="body.regular.md">
                      {username}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {transaction.description}{' '}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {parseBigNumber(Number(transaction.rawAmount))} UNI{' '}
                  </Text>
                </Td>
                <Td>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {transaction.date}
                  </Text>
                </Td>
                <Td>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {transaction.expireDate}
                  </Text>
                </Td>
                <Td>
                  <StatusTag size="sm" status={status} />
                </Td>
                <Td>
                  <Button
                    onClick={() => handleExecutePayment(transaction)}
                    size="md"
                    variant="primary"
                    disabled={btnDisabled}
                  >
                    Execute
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {!hasRows ? (
        <Flex align="center" bg="gray.50" h={16} justify="center" w="full">
          <Text color="gray.600" textStyle="body.bold.sm">
            No rows to show
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default ManagerTransactionsTable;
