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
  return (
    <Table variant="simple" size="lg">
      <Thead>
        <Tr>
          <Th>Destination address</Th>
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
            <Tr>
              <Td>
                <HStack spacing={2}>
                  <Avatar address={transaction.transferTo} />
                  <Text color="gray.500" textStyle="body.regular.md">
                    {transaction.transferTo}
                  </Text>
                </HStack>
              </Td>
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
      </Tbody>
    </Table>
  );
};

export default ManagerTransactionsTable;
