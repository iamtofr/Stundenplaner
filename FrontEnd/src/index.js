import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AppReducer from './reducers/app';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const persistConfig = {
  key: 'app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const store = createStore(
  combineReducers({
    app: persistedReducer,
  }),
);

const persistor = persistStore(store);

ReactDOM.render(<App store={store} persistor={persistor} />, document.getElementById('root'));
registerServiceWorker();
