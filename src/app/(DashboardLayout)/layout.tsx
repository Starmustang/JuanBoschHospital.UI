"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState, useContext } from "react";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Customizer from "./layout/shared/customizer/Customizer";
import Navigation from "./layout/horizontal/navbar/Navigation";
import HorizontalHeader from "./layout/horizontal/header/Header";
import { CustomizerContext } from "@/app/context/customizerContext";
import config from "@/app/context/config";

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { activeLayout, isLayout, isCollapse } = useContext(CustomizerContext);
  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;
  const theme = useTheme();

  const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    padding: activeLayout == "horizontal" ? 0 : "20px",
  }));

  return (
    <MainWrapper>
      <title>Spike NextJs 15.1.6</title>
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <Box width="100%">
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {activeLayout === 'horizontal' ? "" : <Sidebar />}

        {activeLayout === 'horizontal' ? <HorizontalHeader /> : ""}

        {activeLayout === 'horizontal' ? <Navigation /> : ""}
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse === "mini-sidebar" && {
              [theme.breakpoints.up("lg")]: {
                ml: `${MiniSidebarWidth}px`,
              },
            }),
            ...(isCollapse === "full-sidebar" &&
              activeLayout === 'vertical' && {
              [theme.breakpoints.up("lg")]: {
                ml: `${SidebarWidth}px`,
              },
            }),
          }}
        >
          <Container
            sx={{
              maxWidth:
                isLayout === "boxed" ? "lg" : "100%!important",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            {activeLayout === 'horizontal' ? " " : <Header />}

            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}

            <Box
              sx={{
                minHeight: "calc(100vh - 170px)",
                py: { sm: 3 },
              }}
            >
              {children}
            </Box>

            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
          <Customizer />
        </PageWrapper>
      </Box>
    </MainWrapper>
  );
}
