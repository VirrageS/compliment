import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { removeBroadcastMessage } from '../actions/messages';


class BroadcastMessageElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
  }

  handlePress = () => {
    this.props.dispatch(removeBroadcastMessage());
  }

  render() {
    const { message, index } = this.props;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={[ styles.container, { zIndex: -index } ]}>
          <View style={styles.senderView}>
            <Image style={styles.userImage} source={{ uri: message.url }} />
            <Text style={styles.senderText}>{message.from}:</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.messageText}>
              {message.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages };
}

export default connect(mapStateToProps)(BroadcastMessageElement);


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  senderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
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
  contentContainer: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 45,
    fontWeight: '200',
  },
});

