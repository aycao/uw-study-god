import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers';
import App from './app';
import './index.css';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);
ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers)}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
