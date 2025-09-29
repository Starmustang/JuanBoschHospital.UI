import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import { useMainStore } from '@/app/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const { register, isLoading, error } = useMainStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
    
    // Clear password error when user starts typing
    if (field === 'password' || field === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Debug logging
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.userName || !formData.email || !formData.password) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      console.log('Password mismatch detected:');
      console.log('Password:', JSON.stringify(formData.password));
      console.log('Confirm Password:', JSON.stringify(formData.confirmPassword));
      
      const errorMsg = 'La contraseña no coinciden - por favor verifique';
      setPasswordError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      console.log('Calling register function...');
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      
      console.log('Register result:', success);
      
      if (success) {
        toast.success('¡Registro exitoso! Redirigiendo al inicio de sesión...');
        router.push('/auth/auth1/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Ocurrió un error inesperado durante el registro');
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}

      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Stack mb={3} spacing={2}>
          <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
          <CustomTextField id="firstName" variant="outlined" fullWidth required onChange={handleInputChange('firstName')} />

          <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
          <CustomTextField id="lastName" variant="outlined" fullWidth required onChange={handleInputChange('lastName')} />

          <CustomFormLabel htmlFor="userName">Username</CustomFormLabel>
          <CustomTextField id="userName" variant="outlined" fullWidth required onChange={handleInputChange('userName')} />

          <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
          <CustomTextField id="email" type="email" variant="outlined" fullWidth required onChange={handleInputChange('email')} />

          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField id="password" type="password" variant="outlined" fullWidth required onChange={handleInputChange('password')} />

          <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
          <CustomTextField id="confirmPassword" type="password" variant="outlined" fullWidth required onChange={handleInputChange('confirmPassword')} />
        </Stack>
        
        {/* Password mismatch error */}
        {passwordError && (
          <Typography color="error" variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
            ⚠️ {passwordError}
          </Typography>
        )}
        
        {/* General registration error */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
