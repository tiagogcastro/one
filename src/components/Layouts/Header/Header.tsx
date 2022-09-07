import React from 'react';

import { Container } from './styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <Container>
      Header
      {props.children}
    </Container>
  );
};
export default Header;
