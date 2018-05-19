import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessagesTabBarIcon from '../components/MessagesTabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import DevicesScreen from '../screens/DevicesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import CreatePinScreen from '../screens/CreatePinScreen';
import SendMessageScreen from '../screens/SendMessageScreen'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  SendMessage: { screen: SendMessageScreen },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home1',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MessagesStack = createStackNavigator({
  Messages: MessagesScreen,
});

MessagesStack.navigationOptions = {
  tabBarLabel: 'Cheers',
  tabBarIcon: ({ focused }) => (
    <MessagesTabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-text${focused ? '' : '-outline'}` : 'md-text'}
      dot
    />
  ),
};

const DevicesStack = createStackNavigator({
  Devices: DevicesScreen,
});

DevicesStack.navigationOptions = {
  tabBarLabel: 'Devices',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: { screen: MapScreen },
  CreatePin: { screen: CreatePinScreen },
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MessagesStack,
  DevicesStack,
  SettingsStack,
  MapStack,
});
