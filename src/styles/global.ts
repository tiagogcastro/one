import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: white;
  }

  html, body, #root {
    background: #222222;
  }

  body, button, input, select, textarea {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5500s ease-in-out 0s;
    --webkit-background-color: white !important;
  }

  input {
    &:-webkit-autofill {
      box-shadow: 0 0 0 30px #222222 inset !important;
      -webkit-text-fill-color: white;
      border-radius: 0;
      border: none;
      caret-color: white;
    };
    &:active {
      box-shadow: 0 0 0 30px #222222 inset !important;
    };
    &:hover {
      box-shadow: 0 0 0 30px #222222 inset !important;
    };
    &:focus {
      box-shadow: 0 0 0 30px #222222 inset !important;
    };
  }
`;
