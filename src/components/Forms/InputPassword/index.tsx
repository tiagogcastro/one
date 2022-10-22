import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps {
  name: string;
  error?: FieldError;
  labelText?: string;
}

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, labelText, ...rest },
  ref,
) => {
  const [showPassword, setShowPassword] = useState('password');

  return (
    <FormControl fullWidth variant="outlined" style={{ margin: '16px 0 0' }}>
      <InputLabel htmlFor="outlined-adornment-password">{labelText}</InputLabel>
      <OutlinedInput
        ref={ref}
        name={name}
        type={showPassword}
        {...rest}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                setShowPassword((prevState) =>
                  prevState === 'text' ? 'password' : 'text',
                )
              }
            >
              {showPassword === 'password' ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={labelText}
      />

      {!!error && <Typography color="red">{error.message}</Typography>}
    </FormControl>
  );
};

export const InputPassword = forwardRef(InputBase);
