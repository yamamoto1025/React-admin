import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';

import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';

import { getOrganizations, getProfile } from './store/profileSlice';
import ProfileToolbar from './ProfileToolbar';
import ProfileContent from './ProfileContent';
import ProfileDialog from './ProfileDialog';

const useStyles = makeStyles((theme) => ({
  topBg: {
    background: 'url("assets/images/profile/morain-lake.jpg")!important',
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },
  layoutHeader: {
    background: 'none',
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('lg')]: {
      height: 240,
      minHeight: 240,
    },
  },
}));

function ProfilePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const organization = useSelector(({ auth }) => auth.organization.organization);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organization)
      dispatch(getProfile()).then(() => {
        setLoading(false);
      });
    dispatch(getOrganizations());
  }, [dispatch, organization]);

  // const profile = useSelector(({ profilePage }) => profilePage.profile.data);

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <>
      <FusePageSimple
        classes={{
          // topBg: classes.topBg,
          // header: classes.layoutHeader,
          wrapper: 'bg-transparent',
          content: 'w-full max-w-2xl mx-auto',
          toolbar: 'w-full max-w-2xl mx-auto relative flex flex-col min-h-auto h-auto items-start',
        }}
        header={<></>}
        contentToolbar={<ProfileToolbar />}
        content={
          <div className="p-16 sm:p-24">
            <ProfileContent />
          </div>
        }
      />
      <ProfileDialog />
    </>
  );
}

export default withReducer('profilePage', reducer)(ProfilePage);
