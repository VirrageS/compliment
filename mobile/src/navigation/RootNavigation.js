import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import messagesApi from '../api/messages';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { addMessage } from '../actions/messages';

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();

    this.timestamp = 0;
    this.refreshInterval = setInterval(() => {
      messagesApi.getMessages('user', this.timestamp)
        .then((messages) => {
          let lowestTimestamp = Number.MAX_SAFE_INTEGER;
          messages.map((message) => {
            if (message.timestamp < lowestTimestamp) {
              lowestTimestamp = message.timestamp;
            }

            store.dispatch(addMessage(message));
          });

          if (lowestTimestamp !== Number.MAX_SAFE_INTEGER) {
            this.timestamp = lowestTimestamp;
          }
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
