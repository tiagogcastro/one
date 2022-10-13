import React from 'react';

import { Container, HeaderInfo } from './styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = () => {
  return (
    <Container>
      <HeaderInfo>Header</HeaderInfo>
    </Container>
  );
};
export default Header;
