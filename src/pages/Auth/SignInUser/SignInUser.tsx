import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { ISignInCredentials, useAuth } from '../../../hooks/auth';
import { SignInButton } from './styles';

interface IProps {
  setPage: any;
}
const SignInUser: React.FC<IProps> = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ISignInCredentials>({
    email: '',
    password: '',
    remember: false,
    showPassword: false,
  } as ISignInCredentials);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ISignInCredentials) => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Você deve informar um e-mail')
            .email('Formato de e-mail inválido'),
          password: Yup.string().required('Você deve informar uma senha'),
        });

        await schema.validate(data);

        const { email, password, showPassword, remember } = data;
        await signIn({ email, password, showPassword, remember });

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
            <LinearProgress sx={{ margin: '18.625px', height: '5px', width: '200px' }} />
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
                onClick={() => setFormData({ ...formData, remember: !formData.remember })}
              />
            }
            label="Salvar dados"
          />
          <Grid container>
            <Grid item xs>
              <Button onClick={() => setPage('signUp')}>{'Esqueci a senha'}</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setPage('signUp')}>{'Criar conta'}</Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Fade>
  );
};

export default SignInUser;
