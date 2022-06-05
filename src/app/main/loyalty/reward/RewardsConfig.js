import { lazy } from 'react';
import { authRoles } from 'app/auth';

const RewardsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user, // ['admin']
  routes: [
    {
      path: '/rewards',
      component: lazy(() => import('./Rewards')),
    },
    // {
    //   path: '/settings/reward-log',
    //   component: lazy(() => import('./RewardLogApp')),
    // },
  ],
};

export default RewardsConfig;
