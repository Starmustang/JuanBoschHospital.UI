"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CustomizerContext } from '@/app/context/customizerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/utils/i18n";



const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = ThemeSettings();
    const { activeDir } = useContext(CustomizerContext);

    return (
        <>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    <RTL direction={activeDir}>
                        <CssBaseline />
                        {children}
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </RTL>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;
