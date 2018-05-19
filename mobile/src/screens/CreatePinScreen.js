import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Platform, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shortid from 'shortid';
import Colors from '../constants/Colors';
import mapApi from '../api/map';


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
        onPress={() => navigation.navigate('Map')}
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
  }

  render() {
    return (
      <View style={styles.container}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
