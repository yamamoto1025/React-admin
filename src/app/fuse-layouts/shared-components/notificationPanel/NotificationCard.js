import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import history from '@history';
import format from 'date-fns/format';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import NotificationIcon from './NotificationIcon';
import { closeNotificationPanel } from './store/stateSlice';

function NotificationCard(props) {
  const { item, className } = props;
  const { variant } = item.options;

  const dispatch = useDispatch();
  const organization = useSelector(({ auth }) => auth.organization.organization);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  const handleOpenChat = () => {
    if (organization.name !== item.organization.name) {
      dispatch(
        showMessage({
          message: `Please switch Organization to "${item.organization.name}" before open this Chat!`,
          autoHideDuration: 3000,
          variant: 'info',
        })
      );
      dispatch(closeNotificationPanel());
    } else if (item.data.chatId) {
      history.push({
        pathname: `/apps/chat`,
        search: `?chatId=${item.data.chatId}`,
      });
      props.onClose(item.id);
      window.location.reload();
    } else {
      history.push({
        pathname: `/apps/chat`,
      });
      props.onClose(item.id);
      window.location.reload();
    }
  };

  return (
    <Card
      className={clsx(
        'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow',
        variant === 'success' && 'bg-green-600 text-white',
        variant === 'info' && 'bg-blue-700 text-white',
        variant === 'error' && 'bg-red-600 text-white',
        variant === 'warning' && 'bg-orange-600 text-white',
        className
      )}
      elevation={0}
      onClick={handleOpenChat}
    >
      <NotificationIcon value={variant} />
      <div className="flex flex-col">
        <Typography component="div">{item.data.title}</Typography>
        <Typography component="div">{item.data.body}</Typography>
        <div className="flex flex-row mt-8 items-center">
          {item.organization && item.organization.name && (
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              className="items-center mx-8"
              label={item.organization.name}
            />
          )}
          {item.data.createdAt && (
            <Typography className="whitespace-nowrap  font-medium text-12 items-center" color="textSecondary">
              {format(new Date(item.data.createdAt), 'PP')}
            </Typography>
          )}
        </div>
      </div>

      <IconButton
        disableRipple
        className="top-0 right-0 absolute p-16"
        color="inherit"
        size="large"
        onClick={handleClose}
      >
        <Icon className="text-14 opacity-75" color="inherit">
          close
        </Icon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;
