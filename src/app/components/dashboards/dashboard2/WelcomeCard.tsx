import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { CustomizerContext } from '@/app/context/customizerContext';
import { useContext } from 'react';

const WelcomeCard = () => {
  const { isCardShadow } = useContext(CustomizerContext);

  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <Card
      sx={{
        padding: 0,
        border: !isCardShadow ? `1px solid ${borderColor}` : "none",
        overflow: "unset",
      }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      <CardContent sx={{ position: "relative" }}>
        <Typography variant="h5">Welcome Mike Nielsen</Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={4}>
          Check all the statastics
        </Typography>
        <Button variant="contained" color="primary">
          Visit Now
        </Button>
        {lgUp ? (
          <Image
            src="/images/backgrounds/welcome-bg.png"
            alt="img"
            className="welcome-bg2"
            width={340} height={180}
          />
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
