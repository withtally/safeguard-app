import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import WavesIcon from "modules/common/components/icons/WavesIcon";

const WavesBackground: FC = () => (
  <Flex pos="absolute" h="6.375rem" w="full">
    <WavesIcon h="inherit" w="full" />
  </Flex>
);

export default WavesBackground;
