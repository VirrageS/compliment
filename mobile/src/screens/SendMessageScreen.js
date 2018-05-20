import React from 'react';
import { StyleSheet, Button, View, Text, ScrollView, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import MESSAGES from '../shared/messages';
import nodeEmoji from 'node-emoji';

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        const { navigation } = this.props;

        this.state = {
            id: navigation.getParam('id'),
            name: navigation.getParam('name'),
            image: navigation.getParam('image'),
        }
      }

    renderItem = ({ item }) => (
        <Text 
            style={styles.listItem}
            onPress={() => this.sendData(item)}>
            {nodeEmoji.get(item.emojiName)} {item.desc}
        </Text>
      )
    
    keyExtractor = (item, index) => index

    sendData = (message) => {
      const receiver = this.state.id;

      console.log("receiver = ", receiver, ", message = ", message.tagId)
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

      this.props.navigation.navigate('Home')
    }

    render() {
      const name = this.state.name;
      const image = this.state.image;

      console.log(name, image);

      return (
        <ScrollView style={styles.mainContainer} alwaysBounceVertical={false}>
            <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    marginTop: 20}}>
                <Image style={styles.userImage} source={{uri: image}} />
                <Text style={styles.username}>{name}</Text>
            </View>
            <View style={styles.messageContainer}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={Object.values(MESSAGES)}
                    renderItem={this.renderItem}
                />
            </View>
        </ScrollView>
      );
    }
  }

  var styles = StyleSheet.create({  
    mainContainer: {
        backgroundColor: '#FFF',
    },

    listItem: {
        fontSize: 20,
        padding: 10,
    },

    messageContainer: {
        flex: 1,
        padding: 10,
    },

    userImage: {
        width: 250,
        height: 250,
        borderRadius: 250/2,
        marginBottom: 15,
    //   flex: 1
    },

    username: {
        fontSize: 22,
        fontWeight: '200',
        textAlign: 'center'
    }
})

export default DetailsScreen