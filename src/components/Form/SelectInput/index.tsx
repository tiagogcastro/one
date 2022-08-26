import { useField } from '@unform/core';
import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, InputContent, Label, Option, Select } from './styles';

interface ISelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  options: {
    value: string | number;
    label: string | number;
  }[];
  containerCustomStyle?: React.CSSProperties;
}

const SelectInput: React.FC<ISelectInputProps> = ({
  name,
  label,
  icon: Icon,
  options = [],
  containerCustomStyle,
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);
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
        {Icon && <Icon />}
        <Select ref={inputRef} defaultValue={defaultValue} {...rest}>
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </InputContent>
    </Container>
  );
};

export default SelectInput;
