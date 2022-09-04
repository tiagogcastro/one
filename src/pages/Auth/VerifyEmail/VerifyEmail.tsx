import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import React from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';

interface IProps {
  setPage: any;
}

const VerifyEmail: React.FC<IProps> = ({ setPage }) => {
  return (
    <Fade big>
      <Stack
        sx={{
          my: 8,
          mx: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        rowGap={2}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verifique seu e-mail
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enviamos um e-mail contendo o link para verificação da sua conta.
        </Typography>
        <Button onClick={() => setPage('signIn')}>IR PARA LOGIN</Button>
        <Stack
          rowGap={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Stack>
      </Stack>
    </Fade>
  );
};

export default VerifyEmail;
