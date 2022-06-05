import { lazy } from 'react';
import { authRoles } from 'app/auth';

const LoginConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/login',
      component: lazy(() => import('./Login')),
    },
  ],
};

export default LoginConfig;
