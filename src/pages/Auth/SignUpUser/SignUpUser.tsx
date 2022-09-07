import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  FormControl,
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { ISignUpCredentials, useAuth } from '../../../hooks/auth';
import { OptionButton, SignUpButton } from './styles';

interface IProps {
  setPage: any;
}

interface IErrors {
  email: boolean;
  username: boolean;
  password: boolean;
}

const SignUpUser: React.FC<IProps> = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors>({} as IErrors);
  const [formData, setFormData] = useState<ISignUpCredentials>({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  } as ISignUpCredentials);

  const { signUp } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: ISignUpCredentials) => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          name: Yup.string().required('Você deve informar um e-mail'),
          lastname: Yup.string().required('Você deve informar um e-mail'),
          email: Yup.string()
            .required('Você deve informar um e-mail')
            .email('Formato de e-mail inválido'),
          username: Yup.string().required('Você deve informar um e-mail'),
          password: Yup.string().required('Você deve informar uma senha'),

          // passwordConfirmation: ,
        });

        await schema.validate(data);

        const {
          name,
          lastname,
          username,
          email,
          password,
          passwordConfirmation,
          showPassword,
        } = data;
        await signUp({
          name,
          lastname,
          username,
          email,
          password,
          passwordConfirmation,
          showPassword,
        }).then((response: any) => {
          const { success } = response;
          if (success != null) {
            setPage('verifyEmail');
            return success;

            //toast.success('Usuário criado com sucesso!');
          }
        });

        navigate('/');
      } catch (error: any) {
        setErrors(error);
        console.log(error);
        if (error instanceof Yup.ValidationError) {
          toast.error(error.errors[0]);
        } else {
          toast.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [signUp],
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
          Crie uma conta One
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
            id="name"
            label="Nome"
            value={formData.name}
            fullWidth
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            id="lastname"
            label="Sobrenome"
            value={formData.lastname}
            fullWidth
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />

          <TextField
            id="email"
            label="E-mail"
            value={formData.email}
            fullWidth
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <TextField
            id="username"
            label="Nome de usuário"
            value={formData.username}
            fullWidth
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <FormControl fullWidth variant="outlined">
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
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirmar Senha</InputLabel>
            <OutlinedInput
              id="password-confirmation"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.passwordConfirmation}
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirmation: e.target.value })
              }
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
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Senha"
            />
          </FormControl>
          {loading ? (
            <LinearProgress sx={{ margin: '18.625px', height: '5px', width: '200px' }} />
          ) : (
            <SignUpButton
              variant="contained"
              size="large"
              type="button"
              onClick={() => handleSubmit(formData)}
              fullWidth
            >
              Criar conta
            </SignUpButton>
          )}

          <Grid container>
            <Grid item xs>
              <Typography variant="body2" color="text.secondary" align="center">
                Já possui uma conta?{' '}
                <OptionButton onClick={() => setPage('signIn')}>
                  {'Faça login'}
                </OptionButton>
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      {JSON.stringify(errors)}
    </Fade>
  );
};

export default SignUpUser;
