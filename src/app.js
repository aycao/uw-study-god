import React, { Component } from 'react';
import {Router, Route, browserHistory } from 'react-router';

import Home from './components/home/Home';

import './style/App.css';

class App extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

export default App;
