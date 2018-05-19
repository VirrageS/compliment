import React from 'react';
import { StyleSheet, Button, View, Text, ScrollView, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import MESSAGES from '../shared/messages';

class DetailsScreen extends React.Component {
    renderItem = ({ item }) => (
        <ListItem
          roundAvatar
          title={`${item.desc}`}
          avatar={{ uri: item.avatar_url }}
          hideChevron={true}
        />
      )
    
    keyExtractor = (item, index) => index

    render() {
      return (
        <ScrollView alwaysBounceVertical={false}>
            <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    marginTop: 20}}>
                <Image style={styles.artwork} source={{uri: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg'}} />
                <Text style={styles.name}>Rychu Peja</Text>
            </View>
            <View style={styles.container}>
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
    artwork: {
        width: 250,
        height: 250,
        borderRadius: 250/2,
        marginBottom: 30,
        borderColor: 'black',
    //   flex: 1
    },
  
    artworkContainer: {
      flex: 1,
      alignItems: 'stretch',

    },

    name: {
        fontSize: 22,
        fontWeight: '200',
        textAlign: 'center'
    }
})

export default DetailsScreen