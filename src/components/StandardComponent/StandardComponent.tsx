import React from 'react';

import { Container } from './styles';

interface IProps {
  children: React.ReactNode;
}

const StandardComponent: React.FC<IProps> = (props) => {
  return (
    <Container>
      Standard Component
      {props.children}
    </Container>
  );
};
export default StandardComponent;
