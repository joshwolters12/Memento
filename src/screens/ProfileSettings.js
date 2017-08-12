import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HeaderButton from '../components/HeaderButton';

export default class ProfileSettings extends Component {

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderButton
          icon="md-close"
          onPress={() => goBack()}
        />
        <Text style={styles.header}>
          Profile Settings
        </Text>
        <Button
          onPress={() => goBack()}
          title="Close Me"
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