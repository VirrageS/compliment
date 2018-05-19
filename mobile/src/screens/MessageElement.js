import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import shortid from 'shortid';
import nodeEmoji from 'node-emoji';
import { removeMessage } from '../actions/messages';


const MESSAGES = {
  0: {
    desc: 'You are the best',
    emojiName: 'smile',
    backgroundColor: '#ccc',
  },
  1: {
    desc: 'Smile :)',
    emojiName: 'smile',
    backgroundColor: '#fff',
  },
  2: {
    desc: 'Nice',
    emojiName: 'smile',
    backgroundColor: '#444',
  },
  3: {
    desc: 'That was awesome',
    emojiName: 'smile',
    backgroundColor: '#555',
  },
};

class MessageElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
  }

  handlePress = () => {
    this.props.dispatch(removeMessage());
  }

  render() {
    const { messageId, index } = this.props;
    const { desc, emojiName, backgroundColor } = MESSAGES[messageId];

    const emoji = nodeEmoji.get(emojiName);
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View
          key={shortid.generate()}
          style={[
            styles.container,
            {
              zIndex: -index,
              backgroundColor,
            },
          ]}
        >
          <Text style={styles.emoji}>{emoji}</Text>
          <Text key={`text${messageId}`} style={styles.text}>
            {desc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages };
}

export default connect(mapStateToProps)(MessageElement);


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
  },
});

