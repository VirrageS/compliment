import moment from 'moment';
import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import messagesApi from '../api/messages';
import store from '../shared/store';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { addMessage, addBroadcastMessage } from '../actions/messages';


const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();

    this.normalMessageTimestamp = moment.unix(0).unix();
    this.broadcastMessageTimestamp = moment.unix(0).unix();
    this.refreshInterval = setInterval(() => {
      messagesApi.getMessages(1, moment.unix(this.normalMessageTimestamp).toISOString())
        .then((messages) => messages.json())
        .then((messages) => {
          let highestTimestamp = moment.unix(0).unix();
          messages.forEach((message) => {
            if (moment(message.send_time).unix() > highestTimestamp) {
              highestTimestamp = moment(message.send_time).unix();
            }
          });

          if (highestTimestamp !== moment.unix(0).unix()) {
            this.normalMessageTimestamp = highestTimestamp;
          }

          messages.forEach((message) => {
            store.dispatch(addMessage(message));
          });
        })
        .catch(() => {});

      messagesApi.getBroadcastMessages(1, moment.unix(this.broadcastMessageTimestamp).toISOString())
        .then((broadcastMessages) => broadcastMessages.json())
        .then((broadcastMessages) => {
          let highestTimestamp = moment.unix(0).unix();
          broadcastMessages.forEach((broadcastMessage) => {
            if (moment(broadcastMessage.send_time).unix() > highestTimestamp) {
              highestTimestamp = moment(broadcastMessage.send_time).unix();
            }
          });

          if (highestTimestamp !== moment.unix(0).unix()) {
            this.broadcastMessageTimestamp = highestTimestamp;
          }

          broadcastMessages.forEach((broadcastMessage) => {
            store.dispatch(addBroadcastMessage(broadcastMessage));
          });
        })
        .catch(() => {});
    }, 5000);
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
    clearInterval(this.refreshInterval);
  }

  render() {
    return <AppNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
