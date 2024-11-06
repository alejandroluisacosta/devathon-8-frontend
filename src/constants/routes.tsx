import { IoMdSnow } from 'react-icons/io';
import {
  IoAddCircleOutline,
  IoBookOutline,
  IoChatbox,
  IoLocationOutline,
  IoPeopleOutline,
  IoStatsChartOutline,
} from 'react-icons/io5';

interface SideBar {
  title: string;
  path: string;
  icon: JSX.Element;
}

export const SIDE_BAR: SideBar[] = [
  {
    title: 'Gps',
    path: '/',
    icon: <IoLocationOutline />,
  },
  {
    title: 'Reindeers',
    path: '/reindeers',
    icon: <IoMdSnow />,
  },
  {
    title: 'Grades',
    path: '/grades',
    icon: <IoAddCircleOutline />,
  },
  {
    title: 'Calories',
    path: '/calories',
    icon: <IoStatsChartOutline />,
  },
  {
    title: 'Elves',
    path: '/elves',
    icon: <IoPeopleOutline />,
  },
  {
    title: 'Reader',
    path: '/reader',
    icon: <IoBookOutline />,
  },
  {
    title: 'Chill Zone',
    path: '/chill',
    icon: <IoChatbox />,
  },
];
