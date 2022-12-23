// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  goals: getIcon('ic_goals'),
  habits: getIcon('ic_habits'),
  tasks: getIcon('ic_tasks'),
};

const navConfig = [
  // ----------------------------------------------------------------------
  {
    subheader: 'Цели и привычки',
    items: [
      // Tasks
      {
        title: 'Задачи на день',
        path: PATH_DASHBOARD.tasks.root,
        icon: ICONS.tasks
      },
      // Goals
      {
        title: 'Цели',
        path: PATH_DASHBOARD.goals.root,
        icon: ICONS.goals,
        children: [
          { title: 'список', path: PATH_DASHBOARD.goals.list },
          { title: 'создать', path: PATH_DASHBOARD.goals.new },
        ],
      },
      // Habits
      {
        title: 'Привычки',
        path: PATH_DASHBOARD.habits.root,
        icon: ICONS.habits,
      },
    ],
  },
];

export default navConfig;
