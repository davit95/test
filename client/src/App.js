import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'antd/dist/antd.css';
import './assets/common.scss';

import AppRouter from './components/App/AppRouter';

import rootReducer from './reducers/rootReducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)

const App = () => {
  return (
      <Provider store={store}>
          <AppRouter />
      </Provider>
  );
}

export default App;
