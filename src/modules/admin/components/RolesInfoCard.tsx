import { FC } from "react";
import { Link as ReachLink } from "@reach/router";
import { Text, Flex, FlexProps, HStack } from "@chakra-ui/react";

const RolesInfoCard: FC<FlexProps> = ({ ...flexProps }) => {
  return (
    <Flex
      as="article"
      bg="white"
      borderRadius={4}
      direction="column"
      p={5}
      shadow="gray.card"
      w="full"
      {...flexProps}
    >
      <Text color="gray.800" flex={1} mb={8} textStyle="h5">
        Roles Information
      </Text>

      <HStack align="start" spacing={4} mb={4}>
        <Text color="gray.800" textStyle="body.bold.lg">
          Proposer:
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          The proposer role is the one that can make payment request to the
          FailSafe, this request will be queued in the timelock.
        </Text>
      </HStack>
      <HStack align="start" spacing={4} mb={4}>
        <Text color="gray.800" textStyle="body.bold.lg">
          Executor:
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          The executor role is the one that can execute the payment request
          after the timelock delay has pass to receive the payment.
        </Text>
      </HStack>
      <HStack align="start" spacing={4} mb={3}>
        <Text color="gray.800" textStyle="body.bold.lg">
          Canceler:
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          The canceler role is the one that will audit the payments requests
          made to the FailSafe. This role can cancel payments request if they
          are not adequate.
        </Text>
      </HStack>
    </Flex>
  );
};

export default RolesInfoCard;
