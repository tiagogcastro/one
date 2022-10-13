import { Grid } from '@mui/material';
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
      <Grid container>
        <Grid xs={2}>
          <Navbar />
        </Grid>
        <Grid xs={10}>
          {' '}
          <Header />
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};
export default UserLayout;
