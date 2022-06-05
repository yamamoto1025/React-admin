import { authRoles } from 'app/auth';
import store from 'app/store';
import history from '@history';
import { logoutUser } from 'app/auth/store/userSlice';

const LogoutConfig = {
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
  auth: authRoles.user,
  routes: [
    {
      path: '/logout',
      component: () => {
        store.dispatch(logoutUser());
        history.push({
          pathname: '/login',
        });
        return 'Logging out..';
      },
    },
  ],
};

export default LogoutConfig;
