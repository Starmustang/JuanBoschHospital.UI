'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { CustomizerContext } from '@/app/context/customizerContext';
import { useContext } from 'react';


type Props = {
  title: string;
  children: any | any[];
};

const BaseCard = ({ title, children }: Props) => {
  const { isCardShadow } = useContext(CustomizerContext);


  return (
    <Card
      sx={{ padding: 0 }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
