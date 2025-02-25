import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
