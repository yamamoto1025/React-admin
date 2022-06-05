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
      path: '/customers/:customerId',
      component: lazy(() => import('./page/Customer')),
    },
    {
      path: '/customers',
      component: lazy(() => import('./CustomersApp')),
    },
  ],
};

export default CustomersAppConfig;
