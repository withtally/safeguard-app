import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import WavesIcon from "modules/common/components/icons/WavesIcon";

const WavesBackground: FC = () => (
  <Flex h="6.375rem" w="full" pos="absolute" top={32} right={0} zIndex={-2}>
    <WavesIcon h="inherit" w="full" />
  </Flex>
);

export default WavesBackground;
