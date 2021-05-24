import { FC } from "react";
import {
  CircularProgress,
  HStack,
  Text,
  Flex,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";

// admin
import { Transaction } from "modules/admin/lib/types";
import AdminTransactionsTable from "modules/admin/components/AdminTransactionsTable";

type Props = {
  transactions?: Transaction[];
  cancelTransaction: (transaction: Transaction) => Promise<void>;
  formSubmitting: boolean;
};

const ManageRequestedPayments: FC<Props> = ({
  transactions,
  formSubmitting,
  cancelTransaction,
}) => {
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
        <Icon as={IoSettingsOutline} w={6} h={6} />
        <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
          Manage requested payments
        </Text>
      </HStack>
      {formSubmitting ? (
        <Flex
          align="center"
          border="gray.dark"
          minH="22.813rem"
          bg="white"
          justify="center"
          direction="column"
        >
          <CircularProgress isIndeterminate color="purple.300" />
        </Flex>
      ) : (
        <Flex border="gray.dark" bg="white" direction="column">
          {transactions && (
            <AdminTransactionsTable
              transactions={transactions}
              cancelTransaction={cancelTransaction}
            />
          )}
        </Flex>
      )}
    </Stack>
  );
};

export default ManageRequestedPayments;
