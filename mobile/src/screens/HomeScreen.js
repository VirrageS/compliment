import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { addDevice } from '../actions/devices';
import { HomeScreenStyles as styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'People',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Broadcast')}
      >
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-megaphone' : 'md-megaphone'}
        size={25}
        style={{ marginLeft: -35 }}
        color={Colors.tintColor}
      />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      people: [],
    }

    this.fetchPeople()
  }

  fetchPeople = () => {
    fetch("http://localhost:8000", {
      method: 'POST',
      body: JSON.stringify({
        user: "1",
        location: "2"
      })
    })
    .then(() => fetch("http://localhost:8000"))
    .then((response) => { 
      return response.json();
    })
    .then((responseJson) => {
      // console.log("PEOPLE = ", responseJson.people);
      this.setState({
        people: responseJson.people,
      });
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     console.log("updating! date = ", this.state.time)
  //     this.setState({ time: Date.now() })
  //   }, 1000);
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount = () => {
    this.interval = setInterval(this.fetchPeople, 3000)
  }

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      title={`${item.name}`}
      // subtitle={item.subtitle}
      avatar={{ uri: item.avatar_url }}
      // hideChevron={true}
      onPress={() => this.props.navigation.navigate('SendMessage', {name: item.name, image: item.avatar_url})}
    />
  )

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.people}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

}

const list_of_people = [
  {
    name: 'Ryszard Andrzejewski',
    avatar_url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Paweł Poskrobko',
    avatar_url: 'https://dz2cdn1.dzone.com/storage/user-avatar/1721664-thumb.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Michał Preibisch',
    avatar_url: 'https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-8/16300260_1228102917257647_6607834940169510280_o.jpg?_nc_cat=0&oh=72103489546a7cfd6c2ed7e99cc665f9&oe=5B87D264',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Iwona Pytel',
    avatar_url: 'https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-1/c150.0.900.900/28827131_1645075322207352_6650747683372023882_o.jpg?_nc_cat=0&oh=f9e704e58e7f2d7edfc75f48810f9309&oe=5B775E4F',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Filip Stefaniuk',
    avatar_url: 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/11390304_913352588723448_3159420510030916345_n.jpg?_nc_cat=0&oh=4e936ae0cdeae57931b1f32a59ee626b&oe=5B7BC9F0',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Michał Pryt',
    avatar_url: 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/11393134_704674419661497_8714276351391663038_n.jpg?_nc_cat=0&oh=7411ee9ac8f13371c58e7e32c336a631&oe=5B8895F4',
    subtitle: 'Vice Chairman'
  },
  ]

function mapStateToProps(state) {
  return { devices: state.devices }
}

const mapDispatchToProps = {
  addDevice,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#f5f5f5',
//   },
//   elemContainer: {
//     padding: 10,
//     margin: 3,
//     backgroundColor: '#fff',
//   }
// });
