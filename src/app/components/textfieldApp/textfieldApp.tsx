import { Controller, Control } from 'react-hook-form';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { InputAdornment, IconButton } from '@mui/material';
import { useState, ReactNode } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  type?: 'text' | 'number' | 'password'; // Support different input types
  endAdornment?: ReactNode;
  showPasswordToggle?: boolean;
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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (!control) {
    return (
      <>
        <CustomFormLabel htmlFor={name}>{label}</CustomFormLabel>
        <CustomTextField
          id={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          fullWidth={fullWidth}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          InputProps={{
            endAdornment: endAdornment || (showPasswordToggle && type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            ) : undefined)
          }}
        />
      </>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
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
            InputProps={{
              endAdornment: endAdornment || (showPasswordToggle && type === 'password' ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ) : undefined)
            }}
          />
        </>
      )}
    />
  );
};

export default TextFieldApp;