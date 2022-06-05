import { lazy } from 'react';
import { authRoles } from 'app/auth';

const repliesConfigs = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.admin,
  routes: [
    {
      path: '/settings/reply/:replyId',
      component: lazy(() => import('./reply/Reply')),
    },
    {
      path: '/settings/reply/',
      component: lazy(() => import('./replies/Replies')),
    },
  ],
};

export default repliesConfigs;
