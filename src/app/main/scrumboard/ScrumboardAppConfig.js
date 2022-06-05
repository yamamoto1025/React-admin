import { lazy } from 'react';

const ScrumboardAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/boarddetail/:boardId/:boardUri?',
      component: lazy(() => import('./board/Board')),
    },
    {
      path: '/apps/scrumboard/boards',
      component: lazy(() => import('./boards/Boards')),
    },
    // {
    //   path: '/apps/scrumboard',
    //   component: () => <Redirect to="/apps/scrumboard/boards" />,
    // },
  ],
};

export default ScrumboardAppConfig;
