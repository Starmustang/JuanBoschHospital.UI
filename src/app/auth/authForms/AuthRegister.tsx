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

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const success = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    });
    if (success) {
      router.push('/auth/auth1/login');
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
