import { CssBaseline, Grid, Link, Typography } from '@mui/material';
import React, { Suspense, useState } from 'react';

import NouBg from '../../../assets/nou-beer-bg.png';
const SignIn = React.lazy(() => import('../SignInUser/SignInUser'));
const SignUp = React.lazy(() => import('../SignUpUser/SignUpUser'));
const VerifyEmail = React.lazy(() => import('../VerifyEmail/VerifyEmail'));
import { Container, Paper } from './styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Todos os direitos reservados '}
      <Link color="inherit" href="https://www.nou.dev.br/">
        nou®
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AuthHome: React.FC = () => {
  const [authPage, setAuthPage] = useState('signIn');

  return (
    <Container>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={2}
          md={8}
          sx={{
            backgroundImage: `url(${NouBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Suspense fallback={<div></div>}>
            {authPage === 'signIn' && <SignIn setPage={setAuthPage} />}
            {authPage === 'signUp' && <SignUp setPage={setAuthPage} />}
            {authPage === 'verifyEmail' && <VerifyEmail setPage={setAuthPage} />}
            <Copyright sx={{ mt: 5 }} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthHome;
