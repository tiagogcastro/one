import React, { useCallback, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/auth';
import {
  Container,
  Content,
  CreateAccountContainer,
  CreateAccountLink,
  ForgotPassword,
  Form,
  Input,
  SignInButton,
  Title,
} from './styles';

interface ISignFormData {
  email: string;
  password: string;
}

const SignInUser: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ISignFormData) => {
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Você deve informar e-mail e senha!')
            .email('E-mail inválido'),
          password: Yup.string().required('Você deve informar senha'),
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
        //setLoading(false);
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <Title>Login</Title>

          <Input
            label={'E-mail'}
            name="email"
            type="email"
            placeholder={'E-mail'}
            icon={MdEmail}
            required
          />
          <Input
            label={'Senha'}
            name="password"
            type="password"
            placeholder={'Senha'}
            icon={MdLock}
            required
          />

          {loading ? (
            <h1>Carregando</h1>
          ) : (
            <SignInButton color="#fff" type="submit">
              Entrar
            </SignInButton>
          )}

          <ForgotPassword to="/forgot-password">Esqueceu a senha?</ForgotPassword>
        </Form>

        <CreateAccountContainer>
          <CreateAccountLink to="/signup">
            <FaUser />
            Criar conta
          </CreateAccountLink>
        </CreateAccountContainer>
      </Content>
    </Container>
  );
};

export default SignInUser;
