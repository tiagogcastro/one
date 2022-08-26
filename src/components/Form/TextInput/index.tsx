import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, InputContent, InputField, Label } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerCustomStyle?: React.CSSProperties;
}

const TextInput: React.FC<IInputProps> = ({
  name,
  icon: Icon,
  label,
  containerCustomStyle,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerCustomStyle}>
      <Label>{label}</Label>
      <InputContent>
        {Icon && <Icon size={16} />}
        <InputField ref={inputRef} defaultValue={defaultValue} {...rest} />
      </InputContent>
    </Container>
  );
};

export default TextInput;
