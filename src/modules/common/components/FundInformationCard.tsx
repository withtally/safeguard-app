import { FC } from "react";
import { HStack, Text, Flex, Stack } from "@chakra-ui/react";

type Props = {
  balance: string;
  timelockAddress: string;
};

const FundInformationCard: FC<Props> = ({ balance, timelockAddress }) => {
  return (
    <Flex
      as="section"
      borderRadius="sm"
      px={6}
      py={4}
      mt={6}
      w="full"
      shadow="gray.card"
    >
      <HStack spacing="4.75rem">
        <Stack spacing={0.5}>
          <Text color="gray.500" textStyle="label">
            Balance
          </Text>
          <Text textStyle="h4">{balance} UNI</Text>
        </Stack>
        <Stack spacing={0.5}>
          <Text color="gray.500" textStyle="label">
            Timelock Address
          </Text>
          <Text color="gray.500" textStyle="body.md">
            {timelockAddress}
          </Text>
        </Stack>
      </HStack>
    </Flex>
  );
};

export default FundInformationCard;
