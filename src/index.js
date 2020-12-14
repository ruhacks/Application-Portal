import dotenv from 'dotenv';
dotenv.config();

import ReactDOM from 'react-dom';
import React from 'react';

import App from './js/components/App';

import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers';

import 'firebase/auth';
import 'firebase/firestore';
import { createStore } from 'redux';

import { BrowserRouter } from 'react-router-dom';

console.log('process.env', process.env.FIREBASE_API_KEY);

const store = createStore(rootReducer, initialState);

const initialState = {};

const Root = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
};

ReactDOM.render(<Root />, document.getElementById('container'));
