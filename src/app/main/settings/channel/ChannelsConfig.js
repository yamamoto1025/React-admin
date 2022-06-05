import React from 'react';
import { authRoles } from 'app/auth';

// import i18next from 'i18next';
// import Channel from './Channel';
// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';

const ChannelsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin, // ['admin']
  routes: [
    {
      path: '/settings/channels',
      component: React.lazy(() => import('./Channels')),
    },
  ],
};

export default ChannelsConfig;
