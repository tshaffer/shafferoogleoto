// @flow

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../store/reducers';

import RootContainer from './RootContainer';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App;
