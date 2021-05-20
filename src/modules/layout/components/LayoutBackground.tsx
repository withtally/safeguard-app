import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import BackgroundDotsIcon from "modules/common/components/icons/BackgroundDotsIcon";

const LayoutBackground: FC = () => (
  <Flex mt="3.5rem" h="inherit" pos="absolute" right={0} w="full" zIndex={-2}>
    <BackgroundDotsIcon h="inherit" w="full" />
  </Flex>
);

export default LayoutBackground;
