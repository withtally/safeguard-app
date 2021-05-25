import { FC } from "react";
import { Flex, Image } from "@chakra-ui/react";

// assets
import FailFlow from "assets/images/fail-flow.png";

const HomeFailFlow: FC = () => {
  return (
    <Flex
      shadow="gray.card"
      align="center"
      justify="center"
      w="full"
      px={6}
      py={7}
    >
      <Image src={FailFlow} />
    </Flex>
  );
};

export default HomeFailFlow;
