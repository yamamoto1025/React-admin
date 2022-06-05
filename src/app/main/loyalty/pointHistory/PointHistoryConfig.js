import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PointHistoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user, // ['admin']
  routes: [
    {
      path: '/pointHistory',
      component: lazy(() => import('./PointHistory')),
    },
  ],
};

export default PointHistoryConfig;
