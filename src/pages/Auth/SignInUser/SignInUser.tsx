import React, { useCallback, useMemo, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import brazilflagImg from '../../../assets/brazilflag.png';
import euaflagImg from '../../../assets/euaflag.png';
import { useAuth } from '../../../hooks/auth';
import { useTranslation } from '../../../hooks/translation';
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
  TranslateButton,
  TranslateContainer,
  TranslateImage,
} from './styles';
import translatedContent from './translatedcontent';

interface ISignFormData {
  email: string;
  password: string;
}

const SignInUser: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { translation, changeTranslation } = useTranslation();
  let navigate = useNavigate();
  console.log(signIn);
  const translated = useMemo(() => {
    return translation === 'en-us' ? translatedContent.en_US : translatedContent.pt_BR;
  }, [translation]);

  const handleSubmit = useCallback(
    async (data: ISignFormData) => {
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required(translated.alert_set_email_and_password)
            .email(translated.alert_invalid_email),
          password: Yup.string().required(translated.alert_set_email_and_password),
        });

        await schema.validate(data);

        const { email, password } = data;
        await signIn({ email, password });

        navigate('/home');
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
    [history, signIn, translated],
  );

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <Title>Entrar</Title>

          <Input
            label={translated.label_email}
            name="email"
            type="email"
            placeholder={translated.input_placeholder_email}
            icon={MdEmail}
            required
          />
          <Input
            label={translated.label_password}
            name="password"
            type="password"
            placeholder={translated.input_placeholder_password}
            icon={MdLock}
            required
          />

          {loading ? (
            <h1>Carregando</h1>
          ) : (
            <SignInButton color="#fff" type="submit">
              {translated.button_go}
            </SignInButton>
          )}

          <ForgotPassword to="/forgot-password">
            {translated.label_password_forgot}
          </ForgotPassword>

          <TranslateContainer>
            <TranslateButton
              type="button"
              actived={translation === 'pt-br'}
              onClick={() => changeTranslation('pt-br')}
            >
              <TranslateImage src={brazilflagImg} />
            </TranslateButton>

            <TranslateButton
              type="button"
              actived={translation === 'en-us'}
              onClick={() => changeTranslation('en-us')}
            >
              <TranslateImage src={euaflagImg} />
            </TranslateButton>
          </TranslateContainer>
        </Form>

        <CreateAccountContainer>
          <CreateAccountLink to="/signup">
            <FaUser />
            {translated.button_label_register}
          </CreateAccountLink>
        </CreateAccountContainer>
      </Content>
    </Container>
  );
};

export default SignInUser;
