// @flow
import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Login from '../Component/login';
import Home from '../Component/home';

export default class RootContainer extends Component {

  renderScene(route, navigator) {
    if(route.name == 'Login') {
      return <Login navigator={navigator} />
    }
    if(route.name == 'Home') {
      return <Home navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene } />
    );
  }
}
