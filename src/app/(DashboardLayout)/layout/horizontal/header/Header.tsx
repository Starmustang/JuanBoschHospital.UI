import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { CustomizerContext } from "@/app/context/customizerContext";
import { IconMenu2 } from "@tabler/icons-react";
import Notifications from "../../vertical/header/Notification";
import Cart from "../../vertical/header/Cart";
import Profile from "../../vertical/header/Profile";
import Search from "../../vertical/header/Search";
import Language from "../../vertical/header/Language";
import Logo from "../../shared/logo/Logo";

import { Icon } from "@iconify/react";
import config from "@/app/context/config";

export default function Header() {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { isLayout, setIsMobileSidebar, isMobileSidebar, activeMode, setActiveMode } = React.useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",

    [theme.breakpoints.up("lg")]: {
      minHeight: TopbarHeight,
    },
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: "0 auto",
    width: "100%",
    color: `${theme.palette.text.secondary} !important`,
    minHeight: TopbarHeight,
  }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={0}>
      <ToolbarStyled
        sx={{
          maxWidth: isLayout === "boxed" ? "lg" : "100%!important",
        }}
      >
        <Box sx={{ width: lgDown ? "45px" : "auto", overflow: "hidden" }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMobileSidebar(!isMobileSidebar)}

          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ""
        )}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* ------------------------------------------- */}
          {/* Search Dropdown */}
          {/* ------------------------------------------- */}
          <Search />
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Cart />
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <IconButton size="large" color="inherit">
            {activeMode === 'light' ? (
              <Icon icon="solar:moon-line-duotone" width="21" height="21" onClick={() => setActiveMode("dark")} />
            ) : (
              <Icon icon="solar:sun-2-line-duotone" width="21" height="21" onClick={() => setActiveMode("light")} />
            )}
          </IconButton>
          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

