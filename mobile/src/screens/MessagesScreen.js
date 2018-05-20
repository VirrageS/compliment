import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import shortid from 'shortid';
import MessageElement from './MessageElement';
import BroadcastMessageElement from './BroadcastMessageElement';


class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Cheers',
  };

  render() {
    const { normalMessages, broadcastMessages } = this.props;

    if (normalMessages.size === 0 && broadcastMessages.size === 0) {
      return (
        <View style={styles.containerEmpty}>
          <Text style={styles.emptyText}>No new Cheers!</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {normalMessages.map((message, index) => (
          <MessageElement
            key={shortid.generate()}
            message={message}
            index={index}
          />
        ))}
        {broadcastMessages.map((message, index) => (
          <BroadcastMessageElement
            key={shortid.generate()}
            message={message}
            index={index}
          />
        ))}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    normalMessages: state.messages.get('normal'),
    broadcastMessages: state.messages.get('broadcast'),
  };
}

export default connect(mapStateToProps)(MessagesScreen);


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  containerEmpty: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 50,
    color: 'grey',
    fontWeight: '200',
  }
});
