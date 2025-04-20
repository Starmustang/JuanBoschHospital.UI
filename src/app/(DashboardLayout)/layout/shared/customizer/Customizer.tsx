import { FC, useState, useContext } from "react";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CustomizerContext } from "@/app/context/customizerContext";

import Box, { BoxProps } from "@mui/material/Box";
import { IconX, IconSettings, IconCheck } from "@tabler/icons-react";
import { Icon } from "@iconify/react";

import Scrollbar from "@/app/components/custom-scroll/Scrollbar";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import SwipeLeftAltTwoToneIcon from "@mui/icons-material/SwipeLeftAltTwoTone";
import SwipeRightAltTwoToneIcon from "@mui/icons-material/SwipeRightAltTwoTone";
import AspectRatioTwoToneIcon from "@mui/icons-material/AspectRatioTwoTone";
import CallToActionTwoToneIcon from "@mui/icons-material/CallToActionTwoTone";
import ViewSidebarTwoToneIcon from "@mui/icons-material/ViewSidebarTwoTone";
import WebAssetTwoToneIcon from "@mui/icons-material/WebAssetTwoTone";
import {
  ViewComfyTwoTone,
  PaddingTwoTone,
  BorderOuter,
} from "@mui/icons-material";

const SidebarWidth = "320px";
interface colors {
  id: number;
  bgColor: string;
  disp?: string;
}
const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    activeDir,
    setActiveDir,
    activeMode,
    setActiveMode,
    isCollapse,
    setIsCollapse,
    activeTheme,
    activeLayout,
    setActiveLayout,
    isLayout,
    isCardShadow,
    setIsCardShadow,
    setIsLayout,
    isBorderRadius,
    setIsBorderRadius,
    setActiveTheme
  } = useContext(CustomizerContext);


  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  const thColors: colors[] = [
    {
      id: 1,
      bgColor: "#0085db",
      disp: "BLUE_THEME",
    },
    {
      id: 2,
      bgColor: "#0074BA",
      disp: "AQUA_THEME",
    },
    {
      id: 3,
      bgColor: "#763EBD",
      disp: "PURPLE_THEME",
    },
    {
      id: 4,
      bgColor: "#0A7EA4",
      disp: "GREEN_THEME",
    },
    {
      id: 5,
      bgColor: "#01C0C8",
      disp: "CYAN_THEME",
    },
    {
      id: 6,
      bgColor: "#FA896B",
      disp: "ORANGE_THEME",
    },
  ];

  const addAttributeToBody = (cvalue: any) => {
    document.body.setAttribute("data-color-theme", cvalue);
  };

  return (
    (<div>
      {/* ------------------------------------------- */}
      {/* --Floating Button to open customizer ------ */}
      {/* ------------------------------------------- */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "25px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* ------------ Customizer Sidebar ------------- */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box
            p={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h4">Settings</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            {/* ------------------------------------------- */}
            {/* ------------ Dark light theme setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Option
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveMode("light")}
                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeMode === "light"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:sun-2-bold-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Light
              </StyledBox>
              <StyledBox
                onClick={() => setActiveMode("dark")}
                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeMode === "dark"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon icon="solar:moon-bold-duotone" width={24} height={24} />
                </Box>
                Dark
              </StyledBox>
            </Stack>

            <Box pt={3} />
            {/* ------------------------------------------- */}
            {/* ------------ RTL theme setting -------------*/}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Direction
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveDir("ltr")}
                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeDir === "ltr"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:align-left-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                LTR
              </StyledBox>
              <StyledBox
                onClick={() => setActiveDir("rtl")}
                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeDir === "rtl"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:align-right-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                RTL
              </StyledBox>
            </Stack>

            <Box pt={3} />
            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Colors
            </Typography>
            <Grid container spacing={2}>
              {thColors.map((thcolor) => (
                <Grid key={thcolor.id} size={4}>
                  <StyledBox onClick={() => addAttributeToBody(thcolor.disp)}>
                    <Tooltip title={`${thcolor.disp}`} placement="top">
                      <Box
                        sx={{
                          backgroundColor: thcolor.bgColor,
                          width: "25px",
                          height: "25px",
                          borderRadius: "60px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "white",
                        }}
                        aria-label={`${thcolor.bgColor}`}
                        onClick={() => setActiveTheme(thcolor.disp)}

                      >
                        {activeTheme === thcolor.disp ? (
                          <IconCheck width={13} />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Layout Horizontal / Vertical ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Layout Type
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveLayout("vertical")}

                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeLayout === 'vertical'
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:align-horizonta-spacing-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Vertical
              </StyledBox>
              <StyledBox
                onClick={() => setActiveLayout("horizontal")}
                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      activeLayout === 'horizontal'
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:align-vertical-spacing-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Horizontal
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Layout Boxed / Full ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Container Option
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsLayout("boxed")}

                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      isLayout === "boxed"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:documents-minimalistic-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Boxed
              </StyledBox>
              <StyledBox
                onClick={() => setIsLayout("full")}

                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color:
                      isLayout === "full"
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:document-text-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Full
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Sidebar Color setting ------------- */}
            {/* ------------------------------------------- */}

            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            {activeLayout === "horizontal" ? (
              ""
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  Sidebar Type
                </Typography>
                <Stack direction={"row"} gap={2} my={2}>
                  <StyledBox
                    onClick={() => setIsCollapse('full-sidebar')
                    }
                    display="flex"
                    gap={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        color: isCollapse === "full-sidebar"
                          ? "primary.main"
                          : "inherit",
                      }}
                    >
                      <Icon
                        icon="solar:sidebar-minimalistic-outline"
                        width={24}
                        height={24}
                      />
                    </Box>
                    Full
                  </StyledBox>
                  <StyledBox
                    onClick={() => setIsCollapse("mini-sidebar")}

                    display="flex"
                    gap={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        color: isCollapse === "mini-sidebar"
                          ? "primary.main"
                          : "inherit",
                      }}
                    >
                      <Icon
                        icon="solar:siderbar-outline"
                        width={24}
                        height={24}
                      />
                    </Box>
                    Collapse
                  </StyledBox>
                </Stack>
              </>
            )}
            <Box pt={4} />
            <Typography variant="h6" gutterBottom>
              Card With
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsCardShadow(false)}

                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: !isCardShadow
                      ? "primary.main"
                      : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:full-screen-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Border
              </StyledBox>
              <StyledBox
                onClick={() => setIsCardShadow(true)}

                display="flex"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: isCardShadow
                      ? "primary.main"
                      : "inherit",
                  }}
                >
                  <Icon
                    icon="solar:full-screen-square-line-duotone"
                    width={24}
                    height={24}
                  />
                </Box>
                Shadow
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Border Radius
            </Typography>

            <Slider
              size="small"
              value={isBorderRadius}
              aria-label="Small"
              min={4}
              max={24}
              onChange={(event: any) =>
                setIsBorderRadius(event.target.value)
              }
              valueLabelDisplay="auto"
            />
          </Box>
        </Scrollbar>
      </Drawer>
    </div>)
  );
};

export default Customizer;
