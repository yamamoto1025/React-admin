import { lazy } from 'react';
import { authRoles } from 'app/auth';

const GeneralPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.admin,
  routes: [
    {
      path: '/settings/general',
      component: lazy(() => import('./GeneralPage')),
    },
  ],
};

export default GeneralPageConfig;
