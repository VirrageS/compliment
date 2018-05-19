import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import shortid from 'shortid';
import MessageElement from './MessageElement';


class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Cheers',
  };

  render() {
    const { messages } = this.props;

    console.log(messages, messages.size);
    if (messages.size === 0) {
      return (<View style={styles.containerEmpty}><Text style={styles.emptyText}>No new Cheers!</Text></View>);
    }

    return (
      <View style={styles.container}>
        {messages.map((messageId, index) => (
          <MessageElement
            key={shortid.generate()}
            messageId={messageId}
            index={index}
          />
        ))}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages };
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
