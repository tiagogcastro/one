import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  Link,
  Select,
  Stack,
  Typography,
  SelectChangeEvent,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Input } from '../../../components/Forms/Input';
import { InputPassword } from '../../../components/Forms/InputPassword';
import Header from '../../../components/Layouts/Header/Header';
import { SideBar } from '../../../components/Sidebar';
import { RegisterUserData } from '../../../context';
import { useAuth } from '../../../hooks/useAuth';
import { Company, nouApi } from '../../../services';

const signUpFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Você deve informar um e-mail')
    .email('Formato de e-mail inválido'),
  password: Yup.string().required('Você deve informar uma senha'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem ser iguais',
  ),
  name: Yup.string().required('Você deve informar o nome'),
  lastname: Yup.string().required('Você deve informar o último nome'),
  username: Yup.string().required('Você deve informar uma username'),
  company: Yup.object()
    .shape({
      name: Yup.string(),
      id: Yup.string(),
    })
    .optional(),
});

export function SignUpUserPage() {
  const navigateTo = useNavigate();
  const { register: registerUser, isUserAdmin, isUserCompanyAdmin, user } = useAuth();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompanyId, setCurrentCompanyId] = useState('');
  const [radioValue, setRadioValue] = useState('create_company');

  const { formState, handleSubmit, register } = useForm<RegisterUserData>({
    resolver: yupResolver(signUpFormSchema),
  });

  const signUpErrors = formState.errors;

  const handleCreateAccount: SubmitHandler<RegisterUserData> = async (data) => {
    const dataModified = {
      ...data,
      company: {
        name: data.company?.name,
        id: !data.company?.name && user?.Company ? user?.Company[0].id : '',
      },
    };

    const userData = await registerUser(dataModified);

    if (userData) {
      navigateTo(isUserAdmin ? '/admin/dashboard' : '/client/users');
    }
  };

  async function getCompanies() {
    try {
      const response = await nouApi.get('/company/list');

      setCompanies(response.data.companies);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeCompanyId(event: SelectChangeEvent) {
    setCurrentCompanyId(event.target.value as string);
  }

  async function handleChangeRadioValue(event: SelectChangeEvent) {
    setRadioValue(event.target.value as string);
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Box>
      <Header />
      <Box>
        <SideBar />

        <Box
          marginLeft={10}
          borderRadius="40px 0 0 0"
          bgcolor="#1A1A1B"
          paddingTop={8}
          height="100%"
        >
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                mx: 'auto',
                pb: 8,
                maxWidth: 360,
              }}
              rowGap={2}
            >
              <Stack alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Crie uma conta One
                </Typography>
              </Stack>

              <Stack rowGap={2}>
                <Box component="form" onSubmit={handleSubmit(handleCreateAccount)}>
                  <Box>
                    <Input
                      labelText="E-mail"
                      {...register('email')}
                      error={signUpErrors.email}
                    />
                    <Input
                      labelText="Primeiro nome"
                      {...register('name')}
                      error={signUpErrors.name}
                    />
                    <Input
                      labelText="Último nome"
                      {...register('lastname')}
                      error={signUpErrors.lastname}
                    />
                    <Input
                      labelText="Username"
                      {...register('username')}
                      error={signUpErrors.username}
                    />
                    <InputPassword
                      labelText="Senha"
                      {...register('password')}
                      error={signUpErrors.password}
                    />
                    <InputPassword
                      labelText="Confirmação de senha"
                      {...register('password_confirmation')}
                      error={signUpErrors.password_confirmation}
                    />
                  </Box>

                  <Box marginTop={4} marginBottom={2}>
                    <Box>
                      <Typography variant="body1" color="text.secondary">
                        Empresa
                      </Typography>
                      <Box marginY={1} display="flex">
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          value={radioValue}
                          onChange={handleChangeRadioValue}
                        >
                          {companies && isUserAdmin && (
                            <>
                              <FormControlLabel
                                value="create_company"
                                control={<Radio />}
                                label="Criar uma"
                              />
                              <FormControlLabel
                                value="add_a_company"
                                control={<Radio />}
                                label="Adicionar em uma"
                              />
                            </>
                          )}
                        </RadioGroup>
                      </Box>
                    </Box>
                    {companies && isUserAdmin && (
                      <Box>
                        {radioValue === 'create_company' && (
                          <Input
                            labelText="Criar empresa"
                            {...register('company.name')}
                          />
                        )}
                        {radioValue === 'add_a_company' && (
                          <FormControl fullWidth>
                            <InputLabel>Nome da empresa</InputLabel>
                            <Select
                              {...register('company.id')}
                              value={currentCompanyId}
                              label="Nome da empresa"
                              onChange={handleChangeCompanyId}
                            >
                              <MenuItem value={''}>Select...</MenuItem>
                              {companies.map((company) => (
                                <MenuItem key={company.id} value={company.id}>
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                    )}
                    {isUserCompanyAdmin && (
                      <Input
                        labelText="Adicionar na empresa"
                        {...register('company.id')}
                        defaultValue={user?.Company && user?.Company[0].name}
                        disabled
                      />
                    )}
                  </Box>
                  <Button variant="contained" size="large" type="submit" fullWidth>
                    Criar conta
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
