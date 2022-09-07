import { Box as MuiBox, Button, Paper as MuiPaper } from '@mui/material';
import { styled as MStyled } from '@mui/system';
import { Form as Unform } from '@unform/web';
import { Link } from 'react-router-dom';
import { keyframes } from 'styled-components';
import styled from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = MStyled(MuiBox)({
  height: '100vh',
  backgroundColor: '#222',
  color: '#ddd',
}) as typeof MuiBox;

export const Paper = MStyled(MuiPaper)({}) as typeof MuiPaper;

export const Content = MStyled(MuiBox)({}) as typeof MuiBox;
//margin-left: 100px;

export const Form = styled(Unform)`
  min-width: 370px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;
  padding: 20px;

  border-radius: 5px;
  animation: ${animate} 0.5s;
`;

export const Title = styled.h1`
  color: #584;
  margin-bottom: 20px;

  &:after {
    content: '';
    display: block;
    width: 30px;
    border-bottom: 7px solid #584;
  }
`;

export const SignInButton = MStyled(Button)({
  color: '#eee',
}) as typeof Button;

export const Logo = styled.img`
  margin-top: 15px;
  margin-bottom: 40px;

  height: 35px;
  align-self: center;
`;

export const CreateAccountContainer = styled.div`
  margin-top: 15px;
  min-width: 370px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  padding: 20px;

  border-radius: 5px;

  animation: ${animate} 0.5s;
`;

export const CreateAccountLink = styled(Link)`
  display: flex;
  align-items: center;

  text-decoration: none;
  color: #584;
  font-weight: bold;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    margin-right: 7px;
  }
`;

export const LoadContainer = styled.div`
  width: 370px;
  height: 300px;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;
`;

export const ForgotPassword = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;

  margin: 20px auto 10px;

  color: #000;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export const TranslateContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
