import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { addDevice } from '../actions/devices';

import { connect } from 'react-redux'

class DeviceListElement extends React.Component {
  render() {
    console.log('render device list element');
    return (
      <View key={`view${this.props.deviceName}`} style={styles.elemContainer}>
        <Text key={`text${this.props.deviceName}`}>
          {this.props.deviceName}
        </Text>
      </View>
    );
  }
}


class DevicesScreen extends React.Component {
  static navigationOptions = {
    title: 'Bluetooth devices',
  };

  devicesNewRenderer() {
    return this.props.devices.get('old').map(
      (device) => (<DeviceListElement key={`list${device}`} deviceName={device}/>)
    );
  }

  devicesOldRenderer() {
    return this.props.devices.get('new').map(
      (device) => (<DeviceListElement key={`list${device}`} deviceName={device}/>)
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.devicesNewRenderer()}
        {this.devicesOldRenderer()}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { devices: state.devices }
}

const mapDispatchToProps = {
  addDevice,
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f5f5f5',
  },
  elemContainer: {
    padding: 10,
    margin: 3,
    backgroundColor: '#fff',
  }
});
