import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import config from '@/app/context/config'
import { useContext } from "react";
import { ProductProvider } from '@/app/context/Ecommercecontext/index'
import { Icon } from "@iconify/react";
import Notifications from "./Notification";
import Profile from "./Profile";
import Cart from "./Cart";
import Search from "./Search";
import Language from "./Language";


import { shadows } from "@/utils/theme/Shadows";
import { IconButton } from '@mui/material';
import { CustomizerContext } from '@/app/context/customizerContext';

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));


  const TopbarHeight = config.topbarHeight;

  // drawer
  const { activeMode, setActiveMode, setIsCollapse, isCollapse, isMobileSidebar, setIsMobileSidebar } = useContext(CustomizerContext);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: shadows[9],
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    // [theme.breakpoints.up("lg")]: {
    minHeight: TopbarHeight,
    // },
    borderRadius: 13,
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    minHeight: TopbarHeight,
  }));

  return (
    <ProductProvider>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          <Stack spacing={1} direction="row" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Toggle Button Sidebar */}
            {/* ------------------------------------------- */}
            <Button
              color="inherit"
              aria-label="menu"
              size="large"
              className="btn-rounded-circle-40"


              onClick={() => {
                // Toggle sidebar on both mobile and desktop based on screen size
                if (lgUp) {
                  // For large screens, toggle between full-sidebar and mini-sidebar
                  isCollapse === "full-sidebar" ? setIsCollapse("mini-sidebar") : setIsCollapse("full-sidebar");
                } else {
                  // For smaller screens, toggle mobile sidebar
                  setIsMobileSidebar(!isMobileSidebar);
                }
              }}
            >
              <Icon icon="solar:list-bold-duotone" width="24" height="24" />
            </Button>

            {/* ------------------------------------------- */}
            {/* Search Dropdown */}
            {/* ------------------------------------------- */}
          </Stack>
          <Box flexGrow={1} />
          <Stack spacing={2} direction="row" alignItems="center">
            {smUp ? <Search /> : ""}
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
    </ProductProvider>
  );
};

export default Header;
