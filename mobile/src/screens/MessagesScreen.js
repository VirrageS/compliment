import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import shortid from 'shortid';
import { addDevice } from '../actions/devices';


const MESSAGES = {
  0: 'You are the best',
  1: 'Smile :)',
  2: 'Nice',
  3: 'That was awesome',
};

class MessageElement extends React.Component {
  render() {
    const { messageId } = this.props;

    return (
      <View key={shortid.generate()} style={styles.messageElement}>
        <Text key={`text${messageId}`}>
          {MESSAGES[messageId]}
        </Text>
      </View>
    );
  }
}


class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    const { messages } = this.props;

    return (
      <ScrollView style={styles.container}>
        {messages.map(messageId => (
          <MessageElement
            key={shortid.generate()}
            messageId={messageId}
          />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages };
}

export default connect(mapStateToProps)(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f5f5f5',
  },
  messageElement: {
    padding: 10,
    margin: 3,
    backgroundColor: '#fff',
  }
});
