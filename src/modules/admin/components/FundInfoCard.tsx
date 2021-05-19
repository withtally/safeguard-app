import { FC } from "react";
import { Link as ReachLink } from "@reach/router";
import {
  Text,
  Stack,
  Flex,
  FlexProps,
  HStack,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";

type Props = {
  balance: string;
  timelockAddress: string;
  processFlowSteps: string[];
};

const FundInfoCard: FC<Props & FlexProps> = ({
  balance,
  timelockAddress,
  processFlowSteps,
  ...flexProps
}) => {
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
        Information
      </Text>

      <HStack align="center" spacing={4}>
        <Text color="gray.800" textStyle="body.bold.lg">
          Balance
        </Text>
        <Text
          color="gray.500"
          textStyle="body.regular.lg"
        >{`${balance} UNI`}</Text>
      </HStack>
      <HStack spacing={4}>
        <Text color="gray.800" textStyle="body.bold.lg">
          Timelock Address
        </Text>
        <Text color="gray.500" textStyle="body.regular.lg">
          {timelockAddress}
        </Text>
      </HStack>

      <Stack spacing={1} mt={4}>
        <Text color="gray.800" flex={1} textStyle="body.bold.lg">
          Process flow
        </Text>
        <OrderedList px={5}>
          {processFlowSteps.map((step) => (
            <ListItem textStyle="body.regular.lg">{step}</ListItem>
          ))}
        </OrderedList>
      </Stack>
    </Flex>
  );
};

export default FundInfoCard;
