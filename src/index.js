import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

const isRehydrated = store.getState()._persist.rehydrated;

!isRehydrated ?
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

:

ReactDOM.render(
  <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}> <p> Loading... </p> </div>, document.getElementById('root')
)

