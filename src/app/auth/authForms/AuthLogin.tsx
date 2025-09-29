import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { useMainStore } from "@/app/store";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const { login, isLoading, error } = useMainStore();
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.userName || !formData.password) {
      return;
    }

    try {
      const success = await login({
        userName: formData.userName,
        password: formData.password
      });
      
      if (success) {
        // On successful login, redirect to the main page.
        router.push('/');
      }
    } catch (error) {
      // Error is already handled in the slice
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <CustomFormLabel htmlFor="userName">Nombre de usuario</CustomFormLabel>
            <CustomTextField 
              id="userName" 
              type="text"
              variant="outlined" 
              fullWidth 
              value={formData.userName}
              onChange={handleInputChange('userName')}
              required
              disabled={isLoading}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Contraseña</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              disabled={isLoading}
            />
          </Box>
          
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Stack
            justifyContent="space-between"
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            my={2}
          >
           
            
          </Stack>
        </Stack>
        
        <Box mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isLoading || !formData.userName || !formData.password}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </Box>
      </form>
      
      {subtitle}
    </>
  );
};

export default AuthLogin;
