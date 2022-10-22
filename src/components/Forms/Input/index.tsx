import { Box, TextField, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  error?: FieldError;
  labelText?: string;
}

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, error = null, labelText, ...rest },
  ref,
) => {
  return (
    <Box display="flex" flexDirection="column" style={{ margin: '16px 0 0' }}>
      <TextField
        name={name}
        ref={ref}
        type={type}
        label={labelText}
        fullWidth
        {...rest}
      />
      {!!error && <Typography color="red">{error.message}</Typography>}
    </Box>
  );
};

export const Input = forwardRef(InputBase);
