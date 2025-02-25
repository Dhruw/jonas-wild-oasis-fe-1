import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
`;

function Sidebar() {
  return <StyledSidebar></StyledSidebar>;
}

export default Sidebar;
