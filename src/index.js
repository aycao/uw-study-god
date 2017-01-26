import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import 'bootstrap/dist/css/bootstrap.css';

import reducers from './reducers';
import App from './app';
import './index.css';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
