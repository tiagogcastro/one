import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';

import NouBg from '../../../assets/noubg.png';
import { useAuth } from '../../../hooks/auth';
import { Container, Paper, SignInButton } from './styles';

interface ISignFormData {
  email: string;
  password: string;
  remember: boolean;
}

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

const SignInUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ISignFormData>({
    email: '',
    password: '',
    remember: false,
  } as ISignFormData);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ISignFormData) => {
      try {
        console.log(data);
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        });

        await schema.validate(data);

        const { email, password } = data;
        await signIn({ email, password });

        //navigate('/home');
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          console.log(error.errors[0], 'info');
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

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
              Login na plataforma One
            </Typography>
            <Stack
              rowGap={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                id="email"
                label="E-mail"
                value={formData.email}
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  console.log(formData);
                }}
              />

              <TextField
                id="password"
                label="Senha"
                value={formData.password}
                fullWidth
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {loading ? (
                <LinearProgress sx={{ height: '5px', width: '200px' }} />
              ) : (
                <SignInButton
                  variant="contained"
                  size="large"
                  type="button"
                  onClick={() => handleSubmit(formData)}
                  fullWidth
                >
                  Entrar
                </SignInButton>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    value={formData.remember}
                    color="primary"
                    onClick={() =>
                      setFormData({ ...formData, remember: !formData.remember })
                    }
                  />
                }
                label="Salvar dados"
              />
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Esqueci a senha
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {'Criar conta'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInUser;
