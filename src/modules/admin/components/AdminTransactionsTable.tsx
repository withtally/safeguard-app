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
  cancelTransaction: (transaction: Transaction) => Promise<void>;
};

const AdminTransactionsTable: FC<Props> = ({
  transactions,
  cancelTransaction,
}) => {
  return (
    <Table variant="simple" size="lg">
      <Thead>
        <Tr>
          <Th>Destination address</Th>
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
          const btnDisabled =
            transaction.canceled || transaction.executed || transaction.stale;
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
                <StatusTag
                  borderRadius="sm"
                  alignContent="center"
                  status={status}
                />
              </Td>
              <Td>
                <Button
                  onClick={() => cancelTransaction(transaction)}
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
  );
};

export default AdminTransactionsTable;
