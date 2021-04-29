import React, { FC } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Link, Box } from "@material-ui/core";
import { Title, Identicon } from "@gnosis.pm/safe-react-components";

// common
import { useUserInfo } from "modules/common/hooks/useUserInfo";

const StyledHeader = styled.div`
  grid-area: header;
`;

const Header: FC = () => {
  const { userIsAdmin } = useUserInfo();

  return (
    <StyledHeader>
      <AppBar>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link variant="button" href="/" style={{ color: "white" }}>
            FailSafe
          </Link>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <nav style={{ marginRight: "20px" }}>
              {userIsAdmin ? (
                <>
                  <Link
                    variant="button"
                    href="/administrator"
                    style={{ marginRight: "10px", color: "white" }}
                  >
                    Roles
                  </Link>
                  <Link
                    variant="button"
                    href="/administrator/fund"
                    style={{ marginRight: "10px", color: "white" }}
                  >
                    Fund
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    variant="button"
                    href="/manager"
                    style={{ marginRight: "10px", color: "white" }}
                  >
                    Manage Funds
                  </Link>
                </>
              )}
            </nav>
            <Identicon address="thisIsAnExample" size="lg" />
          </Box>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
