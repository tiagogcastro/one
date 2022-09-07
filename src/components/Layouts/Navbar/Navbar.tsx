import React from 'react';

import { Container } from './styles';

interface IProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<IProps> = (props) => {
  return (
    <Container>
      Navbar
      {props.children}
    </Container>
  );
};
export default Navbar;
