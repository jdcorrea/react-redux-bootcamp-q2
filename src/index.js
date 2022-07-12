import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./state/store";
import { debounce } from "debounce";
import { saveToLocalStorage } from './state/DataManagement'

const root = ReactDOM.createRoot(document.getElementById('root'));
store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    console.log('saving in store', store.getState())
    saveToLocalStorage(store.getState());
  }, 800)
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
