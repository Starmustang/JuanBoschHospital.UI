import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: 'screencast-2-line-duotone',
    href: '/',
    bgcolor: "primary",
  },
  {
    id: uniqueId(),
    title: 'Menu Level',
    icon: 'double-alt-arrow-down-bold-duotone',
    href: '/menulevel/',
    bgcolor: "secondary",
    children: [
      {
        id: uniqueId(),
        title: 'Level 1',
        href: '/l1',
      },
      {
        id: uniqueId(),
        title: 'Level 1.1',
        href: '/l1.1',
        children: [
          {
            id: uniqueId(),
            title: 'Level 2',
  
            href: '/l2',
          },
          {
            id: uniqueId(),
            title: 'Level 2.1',
  
            href: '/l2.1',
            children: [
              {
                id: uniqueId(),
                title: 'Level 3',
      
                href: '/l3',
              },
              {
                id: uniqueId(),
                title: 'Level 3.1',
      
                href: '/l3.1',
              },
            ],
          },
        ],
      },
    ],
  },
];
export default Menuitems;
