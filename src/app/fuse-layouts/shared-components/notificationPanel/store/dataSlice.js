import FuseUtils from '@fuse/utils';
import { createEntityAdapter, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebase from 'firebase/compat/app';
import NotificationModel from '../model/NotificationModel';

export const getNotifications = createAsyncThunk(
  'notificationPanel/data/getNotifications',
  async (params, { dispatch, getState }) => {
    try {
      const { token } = await firebase.auth().currentUser.getIdTokenResult();
      if (!token) return [];
      const { organization } = getState().auth.organization;
      if (organization && organization.id) {
        const { id: orgId } = getState().auth.organization.organization;
        const response = await axios.get(`/api/${orgId}/notification`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const userNotification = await response.data;

        // console.log('userNotification ', userNotification);

        const groupNotification = userNotification.reduce((r, a) => {
          r[a.organization.id] = r[a.organization.id] || [];
          r[a.organization.id].push(a);
          return r;
        }, Object.create(null));
        // console.log(groupNotification);

        if (groupNotification) {
          const notificationModel = [];
          const groupKeys = Object.keys(groupNotification);
          groupKeys.forEach(async (key, index) => {
            // console.log(`${key}: ${groupNotification[key]}`);
            const newChatModel = [];
            const newMessageModel = [];
            const mentionModel = [];

            groupNotification[key].forEach((element) => {
              if (element && element.notification && element.notification.data) {
                const data = JSON.parse(element.notification.data);
                if (data.type === 'chat') {
                  newChatModel.push(
                    NotificationModel({
                      id: element.id,
                      message: data.body,
                      data,
                      organization: element.organization,
                    })
                  );
                } else if (data.type === 'message') {
                  newMessageModel.push(
                    NotificationModel({
                      id: element.id,
                      message: data.body,
                      data,
                      organization: element.organization,
                    })
                  );
                } else if (data.type === 'teamChat') {
                  mentionModel.push(
                    NotificationModel({
                      id: element.id,
                      message: data.body,
                      data,
                      organization: element.organization,
                    })
                  );
                } else {
                  notificationModel.push(
                    NotificationModel({
                      id: element.id,
                      message: data.body,
                      data,
                      organization: element.organization,
                    })
                  );
                }
              }
            });

            // console.log('Chat ', newChatModel);
            // console.log('Message ', newMessageModel);
            // console.log('Mention ', mentionModel);

            if (newChatModel.length === 1) {
              notificationModel.push(newChatModel[0]);
            } else if (newChatModel.length > 1) {
              notificationModel.push(
                NotificationModel({
                  id: FuseUtils.generateGUID(),
                  message: `New Chat`,
                  data: {
                    title: 'New Chat',
                    body: `You have ${newChatModel.length} new Chat`,
                  },
                  organization: newChatModel[0].organization,
                })
              );
            }

            if (newMessageModel.length === 1) {
              notificationModel.push(newMessageModel[0]);
            } else if (newMessageModel.length > 1) {
              notificationModel.push(
                NotificationModel({
                  id: FuseUtils.generateGUID(),
                  message: `New Message`,
                  data: {
                    title: 'New Message',
                    body: `You have ${newMessageModel.length} new Message`,
                  },
                  organization: newMessageModel[0].organization,
                })
              );
            }

            if (mentionModel.length === 1) {
              notificationModel.push(mentionModel[0]);
            } else if (mentionModel.length > 1) {
              notificationModel.push(
                NotificationModel({
                  id: FuseUtils.generateGUID(),
                  message: 'Team Chat Mention',
                  data: {
                    title: 'Team Chat Mention',
                    body: `You have ${mentionModel.length} new Mention`,
                  },
                  organization: mentionModel[0].organization,
                })
              );
            }
          });
          return notificationModel;
        }

        // const notiModel = await userNotification.map((item) => {
        //   // console.log('Noti item ', item);
        //   // console.log('Noti item ', item.organization);
        //   return NotificationModel({
        //     id: item.id,
        //     message: item.notification.body,
        //     data: JSON.parse(item.notification.data),
        //     organization: item.organization,
        //     // message: JSON.parse(item.notification.data).title,
        //     // options: { variant: 'success' },
        //   });
        // });
      }
      return [];
    } catch (error) {
      console.error('[notificationPanel/data/getNotifications] ', error);
      return [];
    }
  }
);

export const saveSetting = createAsyncThunk(
  'notificationPanel/data/saveSetting',
  async (setting, { dispatch, getState }) => {
    try {
      const { token } = await firebase.auth().currentUser.getIdTokenResult();
      if (!token) return {};
      const response = await axios.put(`/api/notification/setting`, setting, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userSetting = await response.data;

      return userSetting;
    } catch (error) {
      console.error('[notificationPanel/data/saveSetting] ', error);
      dispatch(
        showMessage({
          message: 'Update user notification setting error!',
          autoHideDuration: 3000,
          variant: 'error',
        })
      );
      return {};
    }
  }
);

export const markReadNotification = createAsyncThunk(
  'notificationPanel/data/markReadNotification',
  async (notificationId, { dispatch, getState }) => {
    try {
      const { token } = await firebase.auth().currentUser.getIdTokenResult();
      if (!token) return [];
      const { id: orgId } = getState().auth.organization.organization;
      const response = await axios.put(
        `/api/${orgId}/notification/read`,
        { notificationId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userNotification = await response.data;

      return userNotification;
    } catch (error) {
      console.error('[notificationPanel/data/markReadNotification] ', error);
      return [];
    }
  }
);
export const markReadAllNotification = createAsyncThunk(
  'notificationPanel/data/markReadAllNotification',
  async (notifications, { dispatch, getState }) => {
    try {
      const { token } = await firebase.auth().currentUser.getIdTokenResult();
      if (!token) return [];
      const { id: orgId } = getState().auth.organization.organization;
      const response = await axios.put(
        `/api/${orgId}/notification/readAll`,
        { notifications },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userNotification = await response.data;

      return userNotification;
    } catch (error) {
      console.error('[notificationPanel/data/markReadAllNotification] ', error);
      return [];
    }
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState: notificationsAdapter.getInitialState({
    setting: {},
  }),
  reducers: {
    dismissItem: (state, action) => notificationsAdapter.removeOne(state, action.payload),
    dismissAll: (state, action) => notificationsAdapter.removeAll(state),
    addNotification: (state, action) => notificationsAdapter.addOne(state, action.payload),
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => notificationsAdapter.addMany(state, action.payload),
    [saveSetting.fulfilled]: (state, action) => {
      const data = action.payload;
      state.setting = data;
    },
  },
});

export const { dismissItem, dismissAll, addNotification } = dataSlice.actions;

export default dataSlice.reducer;
