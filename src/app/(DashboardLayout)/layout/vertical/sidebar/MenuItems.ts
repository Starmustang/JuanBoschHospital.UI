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
    icon: 'stethoscope-outline',    
    bgcolor: "primary",
    href: "/doctor",
    children: [
      {
        id: uniqueId(),
        title: "Doctores",
        href: "/doctor",
      },
      {
        id: uniqueId(),
        title: "Seguro de doctor",
        href: "/doctor/doctorEnsurance",
      }
    ]
  },

  {
    id: uniqueId(),
    title: "Paciente",
    icon: 'user-hand-up-outline',    
    bgcolor: "primary",
    href: "/patient",
    children: [
      {
        id: uniqueId(),
        title: "Pacientes",
        href: "/patient",
      },
      {
        id: uniqueId(),
        title: "Direcciones",
        href: "/patient/patientDirection",
      }
    ]
  },

  {
    id: uniqueId(),
    title: "Sangre",
    icon: 'dropper-minimalistic-line-duotone',    
    bgcolor: "primary",
    href: "/blood",
  },
  

  {
    id: uniqueId(),
    title: "Evaluaciones Medicas",
    icon: 'book-2-outline',    
    bgcolor: "primary",
    href: "/medic/medicEvaluation",
  },
  {
    id: uniqueId(),
    title: "Registros Medicos",
    icon: 'notebook-bookmark-outline',    
    bgcolor: "primary",
    href: "/medic/medicRecords",
  },

  {
    id: uniqueId(),
    title: "Direcciones",
    icon: 'global-outline',    
    bgcolor: "primary",
    href: "/province",
    children: [
      {
        id: uniqueId(),
        title: "Pais",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/country",
      },
      {
        id: uniqueId(),
        title: "Provincia",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/province",
      },
      {
        id: uniqueId(),
        title: "Municipio",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/municipality",
      },
      {
        id: uniqueId(),
        title: "Sector",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/sector",
      },
      {
        id: uniqueId(),
        title: "Doctores",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/address/doctorAddress",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "cita medica",
    icon: 'calendar-date-outline',    
    bgcolor: "primary",
    href: "/dates/dateMedic",
    children: [
      {
        id: uniqueId(),
        title: "Cita medica",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/dates/dateMedic",
      },
      {
        id: uniqueId(),
        title: "Cita de doctor",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/dates/dateDoctor",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Plan de salud",
    icon: 'medical-kit-outline',    
    bgcolor: "primary",
    href: "/ars/arsPlan",
    children: [
      {
        id: uniqueId(),
        title: "Planes de salud",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/ars/arsPlan",
      },
      {
        id: uniqueId(),
        title: "Aseguradoras",
        icon: 'screencast-2-line-duotone',    
        bgcolor: "primary",
        href: "/ars/arsEnsurance",
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
