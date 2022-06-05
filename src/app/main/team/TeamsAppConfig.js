import { lazy } from 'react';
import { authRoles } from 'app/auth';

const CustomersAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user, // ['admin']
  routes: [
    {
      path: '/teams/',
      component: lazy(() => import('./TeamsApp')),
    },
  ],
};

export default CustomersAppConfig;
