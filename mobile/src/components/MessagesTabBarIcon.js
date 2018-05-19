import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

class MessagesTabBarIcon extends React.Component {
  render() {
    let counter = null;
    const { count } = this.props;
    if (!_.isNil(count) && count > 0) {
      counter = (
        <Text style={styles.counter}>
          {count}
        </Text>
      );
    }

    return (
      <View style={{ position: 'relative' }}>
        <Ionicons
          name={this.props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
        {counter}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { count: state.messages.size };
}

export default connect(mapStateToProps)(MessagesTabBarIcon);

const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    top: -2,
    right: -8,
    fontSize: 12,
    color: 'red',
  },
});
