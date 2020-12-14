import Initial from './js/components/initalComp';

import dotenv from 'dotenv';
dotenv.config();

import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore } from 'redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { BrowserRouter, Link } from 'react-router-dom';

console.log('process.env', process.env.FIREBASE_API_KEY);

const store = createStore(rootReducer, initialState);

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

const initialState = {};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <BrowserRouter basename="/">
                        <Initial />
                    </BrowserRouter>
                </ReactReduxFirebaseProvider>
            </Provider>
        </React.StrictMode>
    );
};

ReactDOM.render(<App />, document.getElementById('container'));
