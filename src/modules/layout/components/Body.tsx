import { FC } from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  grid-area: body;
  margin-top: 5rem;
`;

const Body: FC = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

export default Body;
