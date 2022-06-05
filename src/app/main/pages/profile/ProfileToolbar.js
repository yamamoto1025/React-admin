import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { submitForgotWithFireBase } from 'app/auth/store/forgotSlice';
import { openEditProfileDialog } from './store/profileSlice';

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: `4px solid ${theme.palette.background.default}`,
  },
}));

function ProfileToolbar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector(({ profilePage }) => profilePage.profile.data);

  return (
    <div className="w-full px-24 pb-12 flex flex-col md:flex-row flex-1 items-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
        {profile.picture ? (
          <Avatar className={clsx(classes.avatar, '-mt-64  w-128 h-128')} alt={profile.display} src={profile.picture} />
        ) : (
          <Avatar className={clsx(classes.avatar, '-mt-64  w-128 h-128')} />
        )}
      </motion.div>
      <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
          <Typography className="md:px-16 text-24 md:text-32 font-semibold tracking-tight" variant="h4" color="inherit">
            {profile ? (
              <>
                {profile.firstname} {profile.lastname}
              </>
            ) : (
              <></>
            )}
          </Typography>
        </motion.div>

        <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            aria-label="Edit Profile"
            onClick={() => {
              dispatch(openEditProfileDialog());
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            aria-label="Reset Password"
            onClick={() => {
              dispatch(submitForgotWithFireBase({ email: profile.email }));
            }}
          >
            Send email reset password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileToolbar;
