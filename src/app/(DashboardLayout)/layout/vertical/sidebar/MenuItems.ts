import { uniqueId } from "lodash";
interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  bgcolor?: any;
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

// import { useTheme } from '@mui/material';
// const theme = useTheme();

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Pagina principal",
  },

  {
    id: uniqueId(),
    title: "Pagina principal",
    icon: 'screencast-2-line-duotone',
    href: "/",
    bgcolor: "primary",
  },

  {
    id: uniqueId(),
    title: "Doctor",
    icon: 'screencast-2-line-duotone',    
    bgcolor: "primary",
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Paciente",
    icon: 'screencast-2-line-duotone',    
    bgcolor: "primary",
    href: "/",
  },

  {
    navlabel: true,
    subheader: "Otros",
  },
  
  {
    id: uniqueId(),
    title: "External Link",
    external: true,
    icon: 'link-bold-duotone',
    bgcolor: "primary",
    href: "https://google.com",
  },
];

export default Menuitems;
