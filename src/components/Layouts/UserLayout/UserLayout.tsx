import React from 'react';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { Container } from './styles';

interface IProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Header />
      <Navbar />
      {props.children}
      Layout
    </Container>
  );
};
export default UserLayout;
