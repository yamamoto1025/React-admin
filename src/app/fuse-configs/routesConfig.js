import { Redirect } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';

import ErrorPageConfig from 'app/main/pages/errors/ErrorPageConfig';
import LoginConfig from 'app/main/pages/auth/login/LoginConfig';
import RegisterConfig from 'app/main/pages/auth/register/RegisterConfig';
import ForgotPasswordConfig from 'app/main/pages/auth/forgot-password/ForgotPasswordConfig';
import LogoutConfig from 'app/main/pages/auth/logout/LogoutConfig';

import CustomersAppConfig from 'app/main/customer/CustomersAppConfig';
import ChatAppConfig from 'app/main/chat/ChatAppConfig';
import DashboardAppConfig from 'app/main/dashboard/DashboardAppConfig';
import ECommerceConfig from 'app/main/eCommerce/ECommerceConfig';
import OrganizationsAppConfig from 'app/main/organization/OrganizationsAppConfig';
import ProfilePageConfig from 'app/main/pages/profile/ProfilePageConfig';
import LoyaltyAppConfig from 'app/main/loyalty/LoyaltyAppConfig';
import SettingConfig from 'app/main/settings/SettingsConfig';
import TeamsAppConfig from 'app/main/team/TeamsAppConfig';
import UsersAppConfig from 'app/main/user/UsersAppConfig';

import ScrumboardAppConfig from 'app/main/scrumboard/ScrumboardAppConfig';
import TodoAppConfig from 'app/main/todo/TodoAppConfig';

// import ECommerceAppConfig from 'app/main/e-commerce/ECommerceAppConfig';
// import ChannelsConfig from 'app/main/channel/ChannelsConfig';

const routeConfigs = [
  // Error routes config
  ErrorPageConfig,
  // Auth routes config
  ForgotPasswordConfig,
  LogoutConfig,
  LoginConfig,
  RegisterConfig,

  // Fox routes config
  ChatAppConfig,
  CustomersAppConfig,
  DashboardAppConfig,
  ...ECommerceConfig,
  OrganizationsAppConfig,
  ProfilePageConfig,
  ...LoyaltyAppConfig,
  ...SettingConfig,
  TeamsAppConfig,
  UsersAppConfig,
  ScrumboardAppConfig,
  TodoAppConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/apps/chat" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
