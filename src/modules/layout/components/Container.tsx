import React, { FC } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  font-size: 1.5em;
  min-height: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 0.5fr;
  grid-template-rows: 1fr auto 1fr;
  grid-gap: 10px;
  grid-template-areas:
    ". header header ."
    ". body body ."
    ". footer footer .";
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
    grid-template-areas:
      "header"
      "navbar"
      "body"
      "footer";
  }
`;

const Container: FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
