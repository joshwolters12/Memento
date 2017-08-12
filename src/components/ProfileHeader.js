import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  Button,
  StyleSheet,
  View,
  Picker
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';


export default class ProfileHeader extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    icon: 'md-menu',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./../assets/profile.jpg')}
        />
        <View style={styles.containerInfo}>
          <Text style={styles.text}>
            {this.props.data.user.firstName}{this.props.data.user.lastName}
          </Text>
          <Text
            style={styles.editText}
            onPress={() => {
              console.log('edit pressed')
              navigate('ProfileSettings')
              }}
          >
            Edit Profile
          </Text>
        </View>
        <View style={styles.dropDownContainer}>
          <ModalDropdown
            defaultValue={'View: ' + this.props.data.profile.currView}
            style={styles.dropDown}
            textStyle={{ fontSize: 14 }}
            options={['Collection', 'Items']} />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // position absolutely in the top left corner
    ...StyleSheet.absoluteFillObject,
    height: 95,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10
  },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginRight: 15
  },
  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left'
  },
  editText: {
    color: 'blue',
    fontSize: 14,
    textAlign: 'left',
    padding: 0
  },
  containerInfo: {
    borderColor: 'black',
    borderWidth: 0,
    justifyContent: 'center'
  },
  dropDownContainer: {
    alignContent: 'flex-end',
    justifyContent: 'center',
    borderWidth: 0,
    flex: 1,
    alignItems: 'flex-end',
  },
  dropDown: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15
  }
});