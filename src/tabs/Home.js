import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HeaderButton from '../components/HeaderButton';

export default class Home extends Component {
  render() {
    console.log(this.props.screenProps)
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
           Hi {this.props.screenProps.user.firstName} !
        </Text>
        <Button
          onPress={() => navigate('Settings')}
          title="Open Settings Tab"
        />
        <Button
          onPress={() => navigate('Modal')}
          title="Open Modal"
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 20,
  },
});