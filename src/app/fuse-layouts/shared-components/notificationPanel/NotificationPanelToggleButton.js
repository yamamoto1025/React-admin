import Badge from '@mui/material/Badge';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
// import firebaseService from 'app/services/firebaseService';
import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
// import { getChats } from 'app/main/chat/store/chatSlice';
// import { updateCurrent } from 'app/main/chat/store/currentSlice';
import reducer from './store';
// import { selectNotifications, saveSetting, getNotifications, addNotification } from './store/dataSlice';
import { selectNotifications, getNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';
// import NotificationModel from './model/NotificationModel';

function NotificationPanelToggleButton(props) {
  const notifications = useSelector(selectNotifications);
  const user = useSelector(({ auth }) => auth.user);

  const dispatch = useDispatch();

  // function isPushNotificationSupported() {
  //   return 'serviceWorker' in navigator && 'PushManager' in window;
  // }

  // const [userConsent, setUserConsent] = useState(Notification.permission);

  // useEffect(() => {
  //   if (isPushNotificationSupported()) {
  //     if (!('Notification' in window)) {
  //       console.log('This browser does not support desktop notification');
  //     }

  //     // Let's check whether notification permissions have already been granted
  //     else if (Notification.permission === 'granted') {
  //       // If it's okay let's create a notification
  //       console.info('Notification permission granted.');
  //       setUserConsent(Notification.permission);
  //       // var notification = new Notification("Hi there!");
  //     }

  //     // Otherwise, we need to ask the user for permission
  //     else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
  //       Notification.requestPermission(function (permission) {
  //         // If the user accepts, let's create a notification
  //         if (permission === 'granted') {
  //           console.info('Notification permission granted.');
  //           setUserConsent(Notification.permission);
  //           // var notification = new Notification("Hi there!");
  //         } else {
  //           console.info('Notification permission: ', Notification.permission);
  //         }
  //       });
  //     }
  //   } else {
  //     console.info('>> Notification are NOT supported by this browser.');
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userConsent === 'granted') {
  //     const { messaging } = firebaseService;
  //     messaging.onMessage((payload) => {
  //       console.log('Message received. ', payload);
  //       // console.log('@@ notification ', payload.data.createdAt);
  //       // console.log('TIME ', new Date(Number(payload.data.createdAt)).toString());
  //       if (payload && payload.data && payload.data.createdAt) {
  //         dispatch(
  //           addNotification(
  //             NotificationModel({
  //               data: {
  //                 title: payload.notification.title,
  //                 body: payload.notification.body,
  //                 createdAt: Number(payload.data.createdAt),
  //               },
  //               organization: {
  //                 name: payload.data.organization,
  //               },
  //               message: payload.notification.body,
  //             })
  //           )
  //         );
  //       }
  //       dispatch(updateCurrent());
  //       dispatch(getChats());
  //     });
  //   }
  // }, [dispatch, userConsent]);

  // useEffect(() => {
  //   if (userConsent === 'granted' && user && user.foxData) {
  //     const { messaging, getMessagingToken } = firebaseService;
  //     getMessagingToken().then((currentToken) => {
  //       // console.log('FCM currentToken ', currentToken);

  //       // Update Notification Token
  //       dispatch(
  //         saveSetting({
  //           setting: { token: currentToken },
  //         })
  //       );

  //       // Get latest Notification from BAckend
  //       dispatch(getNotifications());
  //     });
  //   }
  // }, [dispatch, user, userConsent]);

  useEffect(() => {
    if (user && user.foxData) {
      // Get latest Notification from BAckend
      dispatch(getNotifications());
    }
  }, [dispatch, user]);

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleNotificationPanel())}>
      <Badge
        color="secondary"
        // variant="dot"
        invisible={notifications.length === 0}
        badgeContent={notifications.length}
        max={99}
      >
        {props.children}
      </Badge>
    </IconButton>
  );
}

NotificationPanelToggleButton.defaultProps = {
  children: <Icon>notifications</Icon>,
};

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
