import { authRoles } from 'app/auth';
import { lazy } from 'react';

const OrganizationsAppConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
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
  auth: authRoles.user,
  routes: [
    {
      path: '/organization',
      component: lazy(() => import('./OrganizationsApp')),
    },
  ],
};

export default OrganizationsAppConfig;
