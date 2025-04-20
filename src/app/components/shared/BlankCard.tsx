'use client'
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { CustomizerContext } from '@/app/context/customizerContext';
import { useContext } from 'react';


type Props = {
  className?: string;
  children: any | any[];
  sx?: any;
};

const BlankCard = ({ children, className, sx }: Props) => {
  const { isCardShadow } = useContext(CustomizerContext);


  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{ p: 0, border: !isCardShadow ? `1px solid ${borderColor}` : 'none', position: 'relative', sx }}
      className={className}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
