import { FC } from "react";
import {
  Text,
  Stack,
  Flex,
  FlexProps,
  HStack,
  ListItem,
  OrderedList,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// assets
import FailFlow from "assets/images/fail-flow.jpg";

// common
import StatusTag from "modules/common/components/StatusTag";

const Home: FC = () => {
  return (
    <Flex direction="column">
      <HStack spacing={10} mb={14}>
        <Stack spacing={4}>
          <Text
            textAlign="center"
            as="h2"
            color="purple.900"
            mb={1}
            textStyle="h2"
          >
            General Overview
          </Text>
          <Text textStyle="paragraph">
            This flow overview will help you understand the SafeApp.
          </Text>
        </Stack>
        <Flex shadow="lg" align="center" justify="center" w="5xl">
          <Image src={FailFlow} />
        </Flex>
      </HStack>

      <Stack spacing={4} mb={14}>
        <Text as="h3" color="purple.900" mb={1} textStyle="h3">
          Roles
        </Text>
        <Text textStyle="paragraph" mb={4}>
          These are the roles that exists in the FailSafe app.
        </Text>

        <Flex border="gray.dark" bg="white" direction="column">
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Role</Th>
                <Th>Description</Th>
                <Th>When can we assign it?</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textStyle="body.bold.lg">Admin</Td>
                <Td>
                  The general manager of all the roles in the FailSafe has the
                  power to grant or revoke any role in the app.
                </Td>
                <Td>
                  This role can only be assigned when we deploy the FailSafe
                  contract.
                </Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">Proposer</Td>
                <Td>
                  This role is can make payment request to the FailSafe, this
                  request will be queued in the timelock.
                </Td>
                <Td>Anytime if we have the Admin role</Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">Executor</Td>
                <Td>
                  This role can execute the payment request after the timelock
                  delay has pass to receive the payment.
                </Td>
                <Td>Anytime if we have the Admin role</Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">Canceler</Td>
                <Td>
                  This role is can audit the payments requests made to the
                  FailSafe. It can cancel payments request if they are not
                  adequate.
                </Td>
                <Td>Anytime if we have the Admin role</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Stack>

      <Stack spacing={4} mb={10}>
        <Text as="h3" color="purple.900" mb={1} textStyle="h3">
          Payment Request States
        </Text>
        <Text textStyle="paragraph" mb={4}>
          These are the states in which a payment request can fall into in the
          FailSafe flow.
        </Text>

        <Flex border="gray.dark" bg="white" direction="column">
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>State</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status="pending" size="lg" />
                </Td>
                <Td>
                  This is the initial state of a payment request. Literally
                  means that is waiting for the timelock delay to be pass.
                </Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status="available" size="lg" />
                </Td>
                <Td>
                  After the timelock delay passes the payment request is in this
                  state. It means that the request can be executed to received
                  the payment.
                </Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status="executed" size="lg" />
                </Td>
                <Td>
                  After an available payment request is executed, it gets this
                  state. This completes the happy path flow and the funds are
                  sent to the specified address and the request is closed.
                </Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status="expired" size="lg" />
                </Td>
                <Td>
                  When a payment request passes the timelock delay, it has an
                  defined execution period. If the request is not executed
                  within this period is automatically set to this state, the
                  request is closed.
                </Td>
              </Tr>
              <Tr>
                <Td textStyle="body.bold.lg">
                  <StatusTag status="canceled" size="lg" />
                </Td>
                <Td>
                  When a payment request is canceled it arrives to this state
                  and closes the payment request.
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Home;
