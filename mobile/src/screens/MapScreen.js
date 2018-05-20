import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Platform, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import shortid from 'shortid';
import Colors from '../constants/Colors';
import mapApi from '../api/map';
import { getCurrentPosition } from '../shared/location';


class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePin')}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          size={35}
          style={{ marginLeft: -35 }}
          color={Colors.tintColor}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      currentCord: {
        latitude: 37.78825,
        longitude: -122.4324,
        timestamp: 1526758103685.3418,
      },
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [
        { cord: { latitude: 37.78325, longitude: -122.4324 }, title: 'Mike Djeb', description: 'LOST WALLET!!' },
        { cord: { latitude: 37.78455, longitude: -122.4354 }, title: 'TEDE', description: 'Skrrrrtt!' },
        { cord: { latitude: 37.78025, longitude: -122.4314 }, title: 'Gal Gadot', description: 'Looking for handsome, blond guy with funny hat.' },
      ],
    };

    this.fetchCurrentPosition(() => {
      const { latitude, longitude } = this.state.currentCord;
      this.setState({
        region: {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    });
  }

  componentDidMount() {
    this.refreshInterval = setInterval(() => {
      this.fetchCurrentPosition(() => {
        // mapApi.sendNewPosition(
        //   'something',
        //   this.state.currentCord.latitude,
        //   this.state.currentCord.longitude,
        //   this.state.currentCord.timestamp,
        // );
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  fetchCurrentPosition = (callback) => {
    getCurrentPosition(
      (position) => {
        this.setState({
          currentCord: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          },
        }, callback);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  onRegionChange = (region) => {
    this.setState({
      region,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this.onRegionChange}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          {this.state.markers.map(marker => (
            <Marker
              key={shortid.generate()}
              coordinate={marker.cord}
              title={marker.title}
              description={marker.description}
            />
          ))}
          {this.props.localPins.map(marker => (
            <Marker
              key={shortid.generate()}
              pinColor="green"
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              description={marker.message}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    devices: state.devices,
    localPins: state.map.get('localPins'),
  }
}

export default connect(mapStateToProps)(MapScreen);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
