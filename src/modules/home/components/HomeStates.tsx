import { FC } from "react";
import {
  Text,
  Stack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// common
import StatusTag from "modules/common/components/StatusTag";

// home
import { STATES_INFORMATION } from "modules/home/lib/constants";

const HomeStates: FC = () => {
  return (
    <Stack spacing={4} mb={10}>
      <Stack spacing={1} mb={4}>
        <Text as="h4" color="purple.800" textStyle="h4">
          Payment Request States
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          These are the states in which a payment request can fall into in the
          FailSafe flow.
        </Text>
      </Stack>
      <Flex shadow="gray.card" bg="white" direction="column">
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>State</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {STATES_INFORMATION.map(({ state, description }) => (
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status={state} size="lg" />
                </Td>
                <Td color="gray.600" textStyle="body.regular.md">
                  {description}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Stack>
  );
};

export default HomeStates;
