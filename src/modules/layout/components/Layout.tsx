import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// layout
import Header from "modules/layout/components/Header";
import Body from "modules/layout/components/Body";
import Footer from "modules/layout/components/Footer";
import WavesBackground from "modules/layout/components/WavesBackground";

const Layout: FC = ({ children }) => {
  return (
    <Flex direction="column" minHeight="120vh" w="full">
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Flex>
  );
};

export default Layout;
