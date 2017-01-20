import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers';
import App from './app';
import './index.css';


const store = createStore(
    reducers,
    applyMiddleware(promise)
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
