import { CustomizerContext } from '@/app/context/customizerContext';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useContext } from 'react';

const BlogCard = () => {
  const { isCardShadow } = useContext(CustomizerContext);

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        padding: 0,
        border: !isCardShadow ? `1px solid ${borderColor}` : "none",
      }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      <Box bgcolor="error.light" p={3} borderRadius={0} textAlign="center">
        <Image
          src="/images/backgrounds/gifts.png"
          height="125"
          width="160"
          alt="blog"
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5" fontSize="16px" component="div">
          Figma Tips and Tricks with Stephan
        </Typography>
        <Typography variant="subtitle2" fontWeight={500}>
          Checkout latest events going to happen in USA.
        </Typography>

        <Stack direction="row" spacing={1} mt={3} alignItems="center">
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="Remy Sharp"
            src="/images/profile/user1.jpg"
          />
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="Travis Howard"
            src="/images/profile/user2.jpg"
          />
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="Cindy Baker"
            src="/images/profile/user3.jpg"
          />
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="Cindy Baker"
            src="/images/profile/user4.jpg"
          />
          <Typography variant="subtitle2" fontWeight={500}>
            18+
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
