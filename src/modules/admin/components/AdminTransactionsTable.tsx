import { FC, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Text, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// common
import { parseBigNumber } from 'modules/common/lib/helpers';
import StatusTag from 'modules/common/components/StatusTag';
import Avatar from 'modules/common/components/Avatar';
import { useUserInformation } from 'modules/common/hooks/useUserInformation';
import { getUsername, getProfileImage } from 'modules/common/lib/helpers';
import { useWeb3 } from 'modules/common/hooks/useWeb3';

// admin
import { Transaction } from 'modules/admin/lib/types';

// manager
import { getTransactionStatus } from 'modules/manager/lib/helpers';

dayjs.extend(advancedFormat);

type Props = {
  transactions: Transaction[];
  cancelTransaction: (transaction: Transaction) => Promise<void>;
};

const AdminTransactionsTable: FC<Props> = ({ transactions, cancelTransaction }) => {
  // constants
  const addresses = useMemo(
    () => transactions.map((transaction) => transaction.transferTo),
    [transactions],
  );
  const hasRows = Boolean(transactions.length);

  // custom hooks
  const { usersInformation } = useUserInformation({
    addresses,
  });
  const { openSelectWallet, isWeb3Ready } = useWeb3();

  // handlers
  const handleCancelPayment = async (transaction: Transaction): Promise<void> => {
    if (isWeb3Ready) {
      await cancelTransaction(transaction)
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
            <Th>Date tx unlocks</Th>
            <Th>Date tx expires</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction: Transaction, index: number) => {
            const status = getTransactionStatus(transaction);
            const btnDisabled = transaction.canceled || transaction.executed || transaction.stale;
            const profileImage = getProfileImage(usersInformation, transaction.transferTo);
            const username = getUsername(usersInformation, transaction.transferTo, false);

            return (
              <Tr key={`${transaction.txHash}-${index}`}>
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
                    {transaction.description}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {parseBigNumber(Number(transaction.rawAmount))} UNI
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
                  <StatusTag borderRadius="sm" alignContent="center" status={status} />
                </Td>
                <Td>
                  <Button
                    onClick={() => handleCancelPayment(transaction)}
                    size="md"
                    variant="error"
                    disabled={btnDisabled}
                  >
                    Cancel
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

export default AdminTransactionsTable;
