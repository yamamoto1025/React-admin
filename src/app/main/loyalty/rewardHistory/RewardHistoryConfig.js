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
      path: '/rewardHistory',
      component: lazy(() => import('./RewardHistory')),
    },
  ],
};

export default PointHistoryConfig;
