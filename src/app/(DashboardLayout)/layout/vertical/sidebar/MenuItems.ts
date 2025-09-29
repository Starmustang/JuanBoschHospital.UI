import { uniqueId } from "lodash";
import { PERMISSIONS, ROLES } from "@/app/utils/permissions";
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
  permissions?: string[]; // Required permissions to access this menu item
  roles?: string[]; // Required roles to access this menu item
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
    icon: 'stethoscope-outline',    
    bgcolor: "primary",
    href: "/doctor",
    roles: [ROLES.ADMIN], // Only admin can access doctor management
    children: [
      {
        id: uniqueId(),
        title: "Doctores",
        href: "/doctor",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Seguro de doctor",
        href: "/doctor/doctorEnsurance",
        roles: [ROLES.ADMIN],
      }
    ]
  },

  {
    id: uniqueId(),
    title: "Paciente",
    icon: 'user-hand-up-outline',    
    bgcolor: "primary",
    href: "/patient",
    roles: [ROLES.ADMIN, ROLES.USER, ROLES.AUXILIAR], // Admin, usuario, and auxiliar can access patients
    children: [
      {
        id: uniqueId(),
        title: "Pacientes",
        href: "/patient",
        roles: [ROLES.ADMIN, ROLES.USER, ROLES.AUXILIAR],
      },
      {
        id: uniqueId(),
        title: "Direcciones",
        href: "/patient/patientDirection",
        roles: [ROLES.ADMIN, ROLES.USER, ROLES.AUXILIAR],
      }
    ]
  },

  {
    id: uniqueId(),
    title: "Sangre",
    icon: 'dropper-minimalistic-line-duotone',    
    bgcolor: "primary",
    href: "/blood",
    roles: [ROLES.ADMIN], // Only admin can access blood management
  },

  {
    id: uniqueId(),
    title: "Usuarios",
    icon: 'users-group-rounded-line-duotone',    
    bgcolor: "primary",
    href: "/users",
    roles: [ROLES.ADMIN], // Only admins can access user management
  },

  {
    id: uniqueId(),
    title: "Evaluaciones Medicas",
    icon: 'book-2-outline',    
    bgcolor: "primary",
    href: "/medic/medicEvaluation",
    roles: [ROLES.ADMIN, ROLES.USER], // Both admin and usuario can access
  },
  {
    id: uniqueId(),
    title: "Registros Medicos",
    icon: 'notebook-bookmark-outline',    
    bgcolor: "primary",
    href: "/medic/medicRecords",
    roles: [ROLES.ADMIN, ROLES.USER], // Both admin and usuario can access
  },

  {
    id: uniqueId(),
    title: "Direcciones",
    icon: 'global-outline',    
    bgcolor: "primary",
    href: "/province",
    roles: [ROLES.ADMIN], // Only admin can access address management
    children: [
      {
        id: uniqueId(),
        title: "Pais",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/country",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Provincia",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/province",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Municipio",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/municipality",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Sector",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/sector",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Doctores",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/doctorAddress",
        roles: [ROLES.ADMIN],
      },
    ]
  },
  {
    id: uniqueId(),
    title: "cita medica",
    icon: 'calendar-date-outline',    
    bgcolor: "primary",
    href: "/dates/dateMedic",
    roles: [ROLES.ADMIN], // Only admin can access appointment management
    children: [
      {
        id: uniqueId(),
        title: "Cita medica",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/dates/dateMedic",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Cita de doctor",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/dates/dateDoctor",
        roles: [ROLES.ADMIN],
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Plan de salud",
    icon: 'medical-kit-outline',    
    bgcolor: "primary",
    href: "/ars/arsPlan",
    roles: [ROLES.ADMIN], // Only admin can access ARS/insurance management
    children: [
      {
        id: uniqueId(),
        title: "Planes de salud",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/ars/arsPlan",
        roles: [ROLES.ADMIN],
      },
      {
        id: uniqueId(),
        title: "Aseguradoras",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/ars/arsEnsurance",
        roles: [ROLES.ADMIN],
      },
    ]
  },

  // {
  //   navlabel: true,
  //   subheader: "Otros",
  // },
  
  // {
  //   id: uniqueId(),
  //   title: "External Link",
  //   external: true,
  //   icon: 'link-bold-duotone',
  //   bgcolor: "primary",
  //   href: "https://google.com",
  // },
];

export default Menuitems;
