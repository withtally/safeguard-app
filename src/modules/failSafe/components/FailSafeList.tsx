import { FC } from "react";
import { HStack, Text, Flex, Stack, Icon } from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";

// failSafe
import FailSafeTable from "modules/failSafe/components/FailSafeTable";
import { FailSafe } from "modules/failSafe/lib/types";

type Props = {
  safeList?: FailSafe[];
};

const FailSafeList: FC<Props> = ({ safeList }) => {
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
          List of created FailSafe
        </Text>
      </HStack>
      <Flex border="gray.dark" bg="white" direction="column">
        {safeList && <FailSafeTable safeList={safeList} />}
      </Flex>
    </Stack>
  );
};

export default FailSafeList;
