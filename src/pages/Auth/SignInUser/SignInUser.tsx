import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import NouBg from '../../../assets/noubg.png';
import { useAuth } from '../../../hooks/auth';
import { Container, Paper, SignInButton } from './styles';

interface ISignFormData {
  email: string;
  password: string;
  remember: boolean;
  showPassword: boolean;
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
    showPassword: false,
  } as ISignFormData);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ISignFormData) => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Você deve informar um e-mail')
            .email('Formato de e-mail inválido'),
          password: Yup.string().required('Você deve informar uma senha'),
        });

        await schema.validate(data);

        const { email, password } = data;
        await signIn({ email, password });

        //navigate('/home');
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          toast.error(error.errors[0]);
        } else {
          toast.error(error);
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="password"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            showPassword: !formData.showPassword,
                          });
                        }}
                        // onMouseDown={handleMouseDownPassword}
                        // edge="end"
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>

              {loading ? (
                <LinearProgress
                  sx={{ margin: '18.625px', height: '5px', width: '200px' }}
                />
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
