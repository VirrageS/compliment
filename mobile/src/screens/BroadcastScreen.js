import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Slider } from 'react-native-elements';
import { Platform, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shortid from 'shortid';
import Colors from '../constants/Colors';

class BroadcastScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Broadcast Message',
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
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
            navigation.navigate('Home');
            // send request
        }}
      >
        <Text
          style={{
            marginRight: 20,
            fontSize: 16,
            color: Colors.tintColor,
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleMessageChange = (message) => {
    this.setState({
      message,
    });
  }

  render() {
    console.log(this.state.message);
    return (
      <View style={styles.container}>
        <View style={styles.message}>
          <FormLabel>Message</FormLabel>
          <FormInput
            maxLength={200}
            value={this.state.message}
            onChangeText={this.handleMessageChange}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { devices: state.devices }
}

export default connect(mapStateToProps)(BroadcastScreen);

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
});
