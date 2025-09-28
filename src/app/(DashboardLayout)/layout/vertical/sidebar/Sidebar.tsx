import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import Logo from "../../shared/logo/Logo";
import Scrollbar from "@/app/components/custom-scroll/Scrollbar";
import { CustomizerContext } from "@/app/context/customizerContext";
import config from '@/app/context/config'
import { Icon } from "@iconify/react";
import { useContext } from "react";

export default function Sidebar() {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
  const {
    isCollapse,
    isSidebarHover,
    setIsSidebarHover,
    isMobileSidebar,
    setIsMobileSidebar,
    isCardShadow
  } = useContext(CustomizerContext);
  const theme = useTheme();

  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;

  const toggleWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover
      ? MiniSidebarWidth
      : SidebarWidth;


  const onHoverEnter = () => {
    if (isCollapse == "mini-sidebar") {
      setIsSidebarHover(true);
    }
  };

  const onHoverLeave = () => {
    setIsSidebarHover(false);
  };


  return (
    <>
      {!lgUp ? (
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            ...(isCollapse == "mini-sidebar" && {
              position: "absolute",
            }),
            borderRadius: "13px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar for desktop */}
          {/* ------------------------------------------- */}
          <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            PaperProps={{
              sx: {
                boxShadow: isCardShadow ? 9 : 0,
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                borderRight: 0,
                boxSizing: "border-box",
                top: 20,
                left: 20,
                bottom: 20,
                borderRadius: "13px",
                height: "calc(100% - 40px)",
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Sidebar Box */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                height: "100%",
              }}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Box px={2}>
                <Logo />
              </Box>
              <Scrollbar
                sx={{
                  height: isCollapse == "mini-sidebar"
                    ? "calc(100% - 90px)"
                    : "calc(100% - 200px)",
                }}
              >
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
              </Scrollbar>
              
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebar}
          onClose={() => setIsMobileSidebar(false)}
          variant="temporary"
          PaperProps={{
            sx: {
              width: SidebarWidth,
              border: "0 !important",
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box px={2}>
            <Logo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar For Mobile */}
          {/* ------------------------------------------- */}
          <SidebarItems />
        </Drawer>
      )}
    </>
  );
}
