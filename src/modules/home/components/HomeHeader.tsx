import { FC } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";

// common
import WavesBackground from "modules/common/components/WavesBackground";

const HomeHeader: FC = () => (
  <Flex
    h="6.375rem"
    w="full"
    pos="absolute"
    px="2rem"
    top="5.375rem"
    right={0}
    justify="center"
    align="center"
  >
    <Stack spacing={2}>
      <Text textStyle="h2" textAlign="center">
        Welcome!
      </Text>
      <Text textStyle="paragraph" textAlign="center">
        This flow overview will help you understand the SafeGuard App{" "}
        <span role="img" aria-label="spaceship">
          🚀
        </span>
      </Text>
    </Stack>
    <WavesBackground />
  </Flex>
);

export default HomeHeader;
