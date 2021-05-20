import { FC } from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

type Props = {
  isHome?: boolean;
};

const Body: FC<Props & ContainerProps> = ({
  isHome,
  children,
  bg,
  ...containerProps
}) => (
  <ChakraContainer
    centerContent
    alignItems="stretch"
    as="main"
    bg={bg}
    display="flex"
    flex={1}
    flexDir="column"
    maxW="8xl"
    mt="5rem"
    px={{ base: 3, lg: 0 }}
    {...containerProps}
  >
    {children}
  </ChakraContainer>
);

export default Body;
