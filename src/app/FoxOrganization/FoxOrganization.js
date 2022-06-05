import { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getOrganization, setOrganization } from 'app/auth/store/organizationSlice';

import { OrganizationContext } from './OrganizationProvider';

const FoxOrganization = (props) => {
  const { location, history } = props;
  const { pathname, state } = location;
  const { children } = props;
  const organizationContext = useContext(OrganizationContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot-password') {
      if (!organizationContext.currentOrganization && pathname !== '/organization') {
        console.info('No Organization detected, redirecting');
        history.push({
          pathname: '/organization',
          state: { redirectUrl: pathname },
        });
      } else {
        history.location.state = {
          redirectUrl: pathname,
        };
        console.info('Organization detected');

        if (
          organizationContext.currentOrganization &&
          organizationContext.currentOrganization.organization &&
          organizationContext.currentOrganization.organization.id
        ) {
          dispatch(getOrganization(organizationContext.currentOrganization.organization.id)).then((result) => {
            if (result && result.payload) {
              organizationContext.setCurrentOrganization(result.payload);
              dispatch(setOrganization(result.payload));
            }
          });
        }
      }
    }
  }, []);

  return <>{children}</>;
};

export default withRouter(FoxOrganization);
