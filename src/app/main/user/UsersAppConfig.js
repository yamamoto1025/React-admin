import { lazy } from 'react';
import { authRoles } from 'app/auth';

const UsersAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/users',
      component: lazy(() => import('./UsersApp')),
    },
    // {
    //   path: '/apps/users/:id',
    //   component: lazy(() => import('./UsersApp')),
    // },
    // {
    //   path: '/apps/users',
    //   component: () => <Redirect to="/apps/users/all" />,
    // },
  ],
};

export default UsersAppConfig;
