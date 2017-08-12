import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class Login extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Hi! Welcome to Memento!
        </Text>
        <TextInput
          name="username"
          style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.props.checkUsername}
          placeholder="username"
          value={this.props.loginInfo.username}
        />
        <TextInput
          name="password"
          style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.props.checkPassword}
          placeholder="password"
          value={this.props.loginInfo.password}
          secureTextEntry= {true}
        />
        <Button 
          title='login'
          onPress = {this.props.verifyLogin}
        />
        <Text>
          {this.props.errorMessage}
        </Text>
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