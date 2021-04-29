import { FC } from "react";

// layout
import Container from "modules/layout/components/Container";
import Header from "modules/layout/components/Header";
import Body from "modules/layout/components/Body";
import Footer from "modules/layout/components/Footer";

const Layout: FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Container>
  );
};

export default Layout;
