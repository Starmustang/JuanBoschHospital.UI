import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import { CustomizerContext } from '@/app/context/customizerContext';
import { Icon } from "@iconify/react";
import Profile from "./Profile";

import { shadows } from "@/utils/theme/Shadows";
import React, { useContext } from "react";
import IconButton from '@mui/material/IconButton';
import config from '@/app/context/config';

const Header = () => {
  
  const TopbarHeight = config.topbarHeight;

  // drawer
  const { activeMode, setActiveMode } = useContext(CustomizerContext);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: shadows[9],
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    minHeight: TopbarHeight,
    borderRadius: 13,
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    minHeight: TopbarHeight,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box flexGrow={1} />
        <Stack spacing={2} direction="row" alignItems="center">
          <IconButton size="large" color="inherit">
            {activeMode === 'light' ? (
              <Icon icon="solar:moon-line-duotone" width="21" height="21" onClick={() => setActiveMode("dark")} />
            ) : (
              <Icon icon="solar:sun-2-line-duotone" width="21" height="21" onClick={() => setActiveMode("light")} />
            )}
          </IconButton>
          
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
