import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
import { DrawerNavigator,StackNavigator,TabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from './src/tabs/Home';
import Collect from './src/tabs/Collect';
import Search from './src/tabs/Search';
import Favorites from './src/tabs/Favorites';
import User from './src/tabs/User';
import Profile from './src/screens/Profile';
import Modal from './src/screens/Modal';
import Drawer from './src/components/Drawer';
import Login from './src/screens/Login';


// Stack navigation for Collect and Profile screens
const CollectTab = StackNavigator({
  Collect: {
    screen: Collect,
    navigationOptions: {
      header: null,               // Hide the header
      headerBackTitle: 'Back!!!!!',    // Title back button Back when we navigate to Profile from Collect
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      // Customize header's title with user name passed to navigate()
      // You can pass any props you'd like. For instance: navigate('Profile', { user: 'Tom' }
      title: `${navigation.state.params.user}'s Profile`,
    }),
  },
},
  {
    headerMode: 'screen',
  });

// Tab navigation for Home and Collect screens
const TabNavigation = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Homeyyy',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons
        name={focused ? 'ios-search' : 'ios-search-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    },
  },
  Collect: {
    screen: CollectTab,
    navigationOptions: {
      tabBarLabel: 'Collect',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons
        name={focused ? 'ios-locate' : 'ios-locate-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    },
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons
        name={focused ? 'ios-heart' : 'ios-heart-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    },
  },
  User: {
    screen: User,
    navigationOptions: {
      tabBarLabel: 'User Profile',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons
        name={focused ? 'ios-contact' : 'ios-contact-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    },
  },

});

// Wrap tab navigation into drawer navigation
const TabsWithDrawerNavigation = DrawerNavigator({
  Tabs: {
    screen: TabNavigation,
  }
}, {
    // Register custom drawer component
    contentComponent: props => <Drawer {...props} />
  });

// And lastly stack together drawer with tabs and modal navigation
// because we want to be able to call Modal screen from any other screen
const AppNavigator = StackNavigator({
  TabsWithDrawer: {
    screen: TabsWithDrawerNavigation,
  },
  Modal: {
    screen: Modal
  },
}, {
    // In modal mode screen slides up from the bottom
    mode: 'modal',
    // No headers for modals. Otherwise we'd have two headers on the screen, one for stack, one for modal.
    headerMode: 'none',
  });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Suman',
      password: 'iscool', //will be check on backend, placeholder for now
      data: {},
      currScreen: 'home',
      loginInfo: { username: undefined, password: undefined },
      errorMessage: ""
    };
  }

  componentWillMount() {
    let login = new Promise((res, rej) => {
      res(AsyncStorage.getItem('@Sherpa:username'))
    })
      .then((result) => {
        if (result !== null) {
          this.setState({ username: result }, () => console.log(result, 'logged in'))
        } else {
          this.state.currScreen = 'login'
        }
      })
      .catch((rejected) => {
        this.setState({ currScreen: 'login' })
        console.log('Error. Try relogging in with username + password')
      })
    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName, params });
  }

  componentDidMount() {
    fetch('http://trophyservice-env.us-east-1.elasticbeanstalk.com/trophy-service/user/5987c47e59265da9120d1d1b')
      .then((res) => res.json())
      .then((resJson) => {
        console.log('received login data:', resJson)
        this.setState({ data: resJson })
      })
      .catch((error) => {
        console.error('error in receiving logged data:', error);
      });
  }


  changeUsernameField(e) {
      let newState = Object.assign({},this.state)
      newState.loginInfo.username = e
      this.setState(newState)
  }

  changePasswordField(e) {
      let newState = Object.assign({},this.state)
      newState.loginInfo.password = e
      this.setState(newState)
  }

  verifyLogin(){
    console.log(this.state.loginInfo)
    console.log(this.state.username, this.state.password)
    if(this.state.username === this.state.loginInfo.username && this.state.password === this.state.loginInfo.password){
      this.setState({currScreen: 'home'})
    } else {
      this.setState({errorMessage: 'Incorrect login and/or password. Please try again'})
    }
  }

  render() {
    if (this.state.currScreen === 'login') {
      return (
        <Login
          loginInfo={this.state.loginInfo}
          checkUsername={this.changeUsernameField.bind(this)}
          checkPassword={this.changePasswordField.bind(this)}
          verifyLogin={this.verifyLogin.bind(this)}
          errorMessage={this.state.errorMessage}
        />
      )
    } else {
      return (
        <AppNavigator screenProps={this.state.data} ref={nav => { this.navigator = nav; }} />
      )
    }
  }
}