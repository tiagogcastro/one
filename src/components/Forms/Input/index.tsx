import { Box, TextField, Typography } from '@mui/material';
import { TextFieldProps } from 'material-ui';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends TextFieldProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  error?: FieldError;
  labelText?: string;
  defaultValue?: any;
  value?: any;
}

const InputBase: React.ForwardRefRenderFunction<any, any> = (
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
        {...(rest as any)}
      />
      {!!error && <Typography color="red">{error.message}</Typography>}
    </Box>
  );
};

export const Input = forwardRef(InputBase);
