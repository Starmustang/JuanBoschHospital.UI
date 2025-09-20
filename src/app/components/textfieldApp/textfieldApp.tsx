import { Controller, Control } from 'react-hook-form';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { InputAdornment, IconButton } from '@mui/material';
import { useState, ReactNode } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { formatNumericInput } from '@/utils/function/formatNumbet';

interface ControlledTextFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  type?: 'text' | 'number' | 'password' | 'date'; // Support different input types
  endAdornment?: ReactNode;
  showPasswordToggle?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  numericOnly?: boolean; // Flag to enable numeric-only input formatting
  phoneFormat?: boolean; // Flag to enable phone number formatting
}

const TextFieldApp: React.FC<ControlledTextFieldProps> = ({
  name,
  control,
  label,
  placeholder = '',
  autoFocus = false,
  fullWidth = true,
  type = 'text',
  endAdornment,
  showPasswordToggle = false,
  multiline = false,
  rows = 4,
  maxRows = 10,
  numericOnly = false,
  phoneFormat = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Apply formatting based on field type
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (phoneFormat) {
            // Format the phone number
            let input = e.target.value.replace(/\D/g, '');

            if (input.length > 10) {
              input = input.slice(0, 10);
            }

            let formattedNumber = '';
            if (input.length > 0) formattedNumber = '(' + input.substring(0, 3);
            if (input.length >= 4) formattedNumber += ') ' + input.substring(3, 6);
            if (input.length >= 7) formattedNumber += '-' + input.substring(6, 10);

            field.onChange(formattedNumber);
          } else if (numericOnly) {
            field.onChange(formatNumericInput(e.target.value));
          } else {
            field.onChange(e.target.value);
          }
        };

        return (
          <>
            <CustomFormLabel htmlFor={name} color={error ? 'error' : 'default'}>
              {label}
            </CustomFormLabel>
            <CustomTextField
              {...field}
              id={name}
              error={!!error}
              helperText={error?.message || ''}
              placeholder={placeholder}
              autoFocus={autoFocus}
              fullWidth={fullWidth}
              type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
              multiline={multiline}
              rows={multiline ? rows : undefined}
              maxRows={multiline ? maxRows : undefined}
              onChange={handleChange}
              value={field.value}
              InputProps={{
                endAdornment:
                  endAdornment ||
                  (showPasswordToggle && type === 'password' ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end" size="small">
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <RemoveRedEyeOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : undefined),
              }}
            />
          </>
        );
      }}
    />
  );
};

export default TextFieldApp;
