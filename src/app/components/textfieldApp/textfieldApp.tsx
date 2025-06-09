import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';

interface TextFieldAppProps extends Omit<TextFieldProps, 'name' | 'error'> {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError | undefined;
  helperText?: string;
  autoFocus?: boolean;
}

const TextFieldApp: React.FC<TextFieldAppProps> = ({
  name,
  label,
  control,
  error,
  helperText,
  autoFocus = false,
  ...textFieldProps
}) => {
  return (
    <>
      <CustomFormLabel htmlFor={name} color={error ? 'error' : 'default'}>
        {label}
      </CustomFormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            id={name}
            error={!!error}
            helperText={error?.message || helperText}
            fullWidth
            autoFocus={autoFocus}
            {...textFieldProps}
          />
        )}
      />
    </>
  );
};

export default TextFieldApp;
