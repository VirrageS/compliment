import React from 'react';
import { TouchableOpacity, StyleSheet, Button, View, Text, ScrollView, Image, Animated } from 'react-native';
import { ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import MESSAGES from '../shared/messages';
import nodeEmoji from 'node-emoji';


const ANIMATION_DURATION = 500;

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      id: navigation.getParam('id'),
      name: navigation.getParam('name'),
      image: navigation.getParam('image'),
    };
  }

  sendMessage = (message) => {
    const receiver = this.state.id;

    fetch("http://localhost:8080/send_message/", {
      method: 'POST',
      body: JSON.stringify({
        sender_id: 1,
        receiver_id: receiver,
        tag_id: message.tagId,
      })
    })
    .then((response) => {
      console.log("Sent. receiver = ", receiver, ", message = ", message.tagId)
    })

    this.props.navigation.navigate('Home');
  }

  render() {
    const name = this.state.name;
    const image = this.state.image;

    return (
      <ScrollView style={styles.mainContainer} alwaysBounceVertical={false}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            marginTop: 20
          }}
        >
          <Image style={styles.userImage} source={{uri: image}} />
          <Text style={styles.username}>{name}</Text>
        </View>
        <View style={styles.messageContainer}>
          {Object.values(MESSAGES).map((message) => (
            <TouchableOpacity
              key={message.tagId}
              style={styles.item}
              onPress={() => this.sendMessage(message)}
            >
              <Text
                style={styles.itemEmoji}
              >
                {nodeEmoji.get(message.emojiName)}
              </Text>
              <Text
                style={styles.itemText}
              >
                {message.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF',
  },
  userImage: {
    width: 230,
    height: 230,
    borderRadius: 230/2,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: '200',
    textAlign: 'center'
  },
  messageContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    flexDirection: 'column',
  },
  item: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemEmoji: {
    fontSize: 35,
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '300',
  },
})

export default DetailsScreen
