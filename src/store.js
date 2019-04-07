import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';
import notifyReducers from './reducers/notifyReducers';
import settingsReducers from './reducers/settingsReducers';

const firebaseConfig = {
  apiKey: 'AIzaSyDgMV7iZ-YILZZUruILUpnrUoBvBJkyK_8',
  authDomain: 'reactclientfb.firebaseapp.com',
  databaseURL: 'https://reactclientfb.firebaseio.com',
  projectId: 'reactclientfb',
  storageBucket: 'reactclientfb.appspot.com',
  messagingSenderId: '568961140235'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
//const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducers,
  settings: settingsReducers
});

//check in localstorage
if (localStorage.getItem('settings') == null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegisteration: false
  };
  //set in localstorage "key", "valule"
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
