import { FC } from "react";
import { HStack, Text, Flex, Stack, Icon } from "@chakra-ui/react";
import { IoListOutline } from "react-icons/io5";

// common
import { useTransactions } from "modules/common/hooks/useTransactions";

// admin
import AdminTransactionsTable from "modules/admin/components/AdminTransactionsTable";

const ManageRequestedPayments: FC = () => {
  // custom hooks
  const { transactions, cancelTransaction } = useTransactions();

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
          <AdminTransactionsTable
            transactions={transactions}
            cancelTransaction={cancelTransaction}
          />
        )}
      </Flex>
    </Stack>
  );
};

export default ManageRequestedPayments;
