import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import shortid from 'shortid';
import nodeEmoji from 'node-emoji';
import { removeMessage } from '../actions/messages';
import MESSAGES from '../shared/messages';
import { ListItem } from 'react-native-elements'

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
        <View style={styles.senderView}>
          <Image style={styles.userImage} source={{uri: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg'}} />
          <Text style={styles.senderText}>Ryszard Andrzejewski:</Text>
        </View>
        <View
          key={shortid.generate()}
          style={[
            styles.container,
            {
              zIndex: -index,
              backgroundColor: '#FFF',
            },
          ]}
        >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.emojiText} key={`text${messageId}`}>
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
  senderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  senderText: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "600",
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  emoji: {
    marginTop: -300,
    fontSize: 300,
  },
  emojiText: {
    fontSize: 40,
    fontWeight: '200',
    alignSelf: 'center',
    color: '#000',
  },
});

