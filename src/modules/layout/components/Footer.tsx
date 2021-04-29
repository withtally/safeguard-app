import { FC } from "react";
import styled from "styled-components";
import { Typography, Link, Box } from "@material-ui/core";

const StyledFooter = styled.div`
  grid-area: footer;
  margin-top: 3rem;
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with ❤ by
      <Link color="inherit" href="https://withtally.com/">
        Tally
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer: FC = () => {
  return (
    <StyledFooter>
      <footer>
        <Copyright />
      </footer>
    </StyledFooter>
  );
};

export default Footer;
