import { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// common
import { parseBigNumber } from "modules/common/lib/helpers";
import StatusTag from "modules/common/components/StatusTag";
import Avatar from "modules/common/components/Avatar";

// admin
import { Transaction } from "modules/admin/lib/types";

// manager
import { getTransactionStatus } from "modules/manager/lib/helpers";

dayjs.extend(advancedFormat);

type Props = {
  transactions: Transaction[];
  executeTransaction: (transaction: Transaction) => Promise<void>;
};

const ManagerTransactionsTable: FC<Props> = ({
  transactions,
  executeTransaction,
}) => {
  const hasRows = Boolean(transactions.length);
  return (
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
          const etaMeet = transaction.eta <= dayjs().format("X");
          const btnDisabled =
            !transaction.currentlyQueued || !etaMeet || transaction.stale;
          return (
            <Tr key={`${index}-${transaction.txHash}`}>
              <Td>
                <HStack spacing={2}>
                  <Avatar address={transaction.transferTo} />
                  <Text color="gray.500" textStyle="body.regular.md">
                    {transaction.transferTo}
                  </Text>
                </HStack>
              </Td>
              <Td>{transaction.description}</Td>
              <Td isNumeric>
                {parseBigNumber(Number(transaction.rawAmount))} UNI
              </Td>
              <Td>{transaction.date}</Td>
              <Td>{transaction.expireDate}</Td>
              <Td>
                <StatusTag size="sm" status={status} />
              </Td>
              <Td>
                <Button
                  onClick={() => executeTransaction(transaction)}
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
        {!hasRows ? (
          <Tr align="center" bg="gray.50" h={16} justify="center" w="full">
            <Td></Td>
            <Td></Td>
            <Td>
              <Text color="gray.600" textStyle="body.bold.sm">
                No transactions yet
              </Text>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        ) : null}
      </Tbody>
    </Table>
  );
};

export default ManagerTransactionsTable;
