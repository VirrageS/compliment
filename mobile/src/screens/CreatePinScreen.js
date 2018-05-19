import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Slider } from 'react-native-elements';
import { Platform, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shortid from 'shortid';
import Colors from '../constants/Colors';
import mapApi from '../api/map';
import { getCurrentPosition } from '../shared/location';


const EXPIRATION = {
  0: {
    label: '5 min',
    duration: 5 * 60 * 1000,
  },
  1: {
    label: '10 min',
    duration: 10 * 60 * 1000,
  },
  2: {
    label: '30 min',
    duration: 30 * 60 * 1000,
  },
  3: {
    label: '1 hour',
    duration: 30 * 60 * 1000,
  },
  4: {
    label: '2 hours',
    duration: 2 * 60 * 60 * 1000,
  },
  5: {
    label: '5 hours',
    duration: 5 * 60 * 60 * 1000,
  },
  6: {
    label: '10 hours',
    duration: 10 * 60 * 60 * 1000,
  },
  7: {
    label: '1 day',
    duration: 24 * 60 * 60 * 1000,
  },
}


class CreatePinScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Pin',
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          style={{ marginLeft: 20 }}
          color={Colors.tintColor}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const { timestamp } = position;
              const { message, expiration } = navigation.state.params.getState();

              console.log(latitude, longitude, timestamp, message, EXPIRATION[expiration].duration);
              mapApi.setMarker(
                'user',
                message,
                EXPIRATION[expiration].duration,
                latitude,
                longitude,
                timestamp,
              )
              .finally(() => {
                navigation.navigate('Map');
              });
            },
            () => {},
          );
        }}
      >
        <Text
          style={{
            marginRight: 20,
            fontSize: 16,
            color: Colors.tintColor,
          }}
        >
          Create
        </Text>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      expiration: 0,
    };

    this.props.navigation.setParams({
      getState: this.getState,
    });
  }

  getState = () => this.state;

  handleMessageChange = (message) => {
    this.setState({
      message,
    });
  }

  handleSliderChange = (expiration) => {
    this.setState({
      expiration,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.message}>
          <FormLabel>Message</FormLabel>
          <FormInput
            value={this.state.message}
            onChangeText={this.handleMessageChange}
          />
        </View>

        <View style={styles.sliderContainer}>
          <FormLabel>Duration</FormLabel>
          <View style={styles.slider}>
            <Slider
              value={this.state.expiration}
              maximumValue={Number(_.first(Object.keys(EXPIRATION)))}
              maximumValue={Number(_.last(Object.keys(EXPIRATION)))}
              step={1}
              onValueChange={this.handleSliderChange}
            />
            <Text style={styles.sliderText}>
              {EXPIRATION[this.state.expiration].label}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { devices: state.devices }
}

export default connect(mapStateToProps)(CreatePinScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
  message: {
    marginBottom: 10,
  },
  sliderContainer: {
    marginTop: 30,
  },
  slider: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  sliderText: {
    fontSize: 18,
    fontWeight: '100',
  }
});
