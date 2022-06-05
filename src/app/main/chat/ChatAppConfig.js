import { lazy } from 'react';
import { authRoles } from 'app/auth';

const ChatAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/apps/chat',
      component: lazy(() => import('./ChatApp')),
    },
  ],
};

export default ChatAppConfig;
