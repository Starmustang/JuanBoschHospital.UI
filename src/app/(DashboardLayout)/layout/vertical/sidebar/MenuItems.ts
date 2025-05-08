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
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Sample Page",
    icon: 'screencast-2-line-duotone',
    href: "/",
    bgcolor: "primary",
  },
  {
    navlabel: true,
    subheader: "Other",
  },
  {
    id: uniqueId(),
    title: "Menu Level",
    icon: 'double-alt-arrow-down-bold-duotone',
    href: "/menulevel/",
    bgcolor: "primary",
    children: [
      {
        id: uniqueId(),
        title: "Level 1",
        href: "/l1",
      },
      {
        id: uniqueId(),
        title: "Level 1.1",
        href: "/l1.1",
        children: [
          {
            id: uniqueId(),
            title: "Level 2",
            href: "/l2",
          },
          {
            id: uniqueId(),
            title: "Level 2.1",
            href: "/l2.1",
            children: [
              {
                id: uniqueId(),
                title: "Level 3",
                href: "/l3",
              },
              {
                id: uniqueId(),
                title: "Level 3.1",
                href: "/l3.1",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Disabled",
    icon: 'forbidden-circle-line-duotone',
    bgcolor: "secondary",
    href: "",
    disabled: true,
  },
  {
    id: uniqueId(),
    title: "SubCaption",
    subtitle: "This is the sutitle",
    icon: 'square-academic-cap-line-duotone',
    bgcolor: "warning",
    href: "",
  },

  {
    id: uniqueId(),
    title: "Chip",
    icon: 'archive-check-line-duotone',
    bgcolor: "error",
    href: "",
    chip: "9",
    chipColor: "error",
  },
  {
    id: uniqueId(),
    title: "Outlined",
    icon: 'smile-circle-line-duotone',
    bgcolor: "info",
    href: "",
    chip: "outline",
    variant: "outlined",
    chipColor: "info",
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
