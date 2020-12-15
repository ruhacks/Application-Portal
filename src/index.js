import dotenv from 'dotenv';
dotenv.config();

import ReactDOM from 'react-dom';
import React from 'react';

import App from './js/components/App';

import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers';

import 'firebase/auth';
import 'firebase/firestore';

import { BrowserRouter } from 'react-router-dom';

import configureStore from './configureStore'

const initialState = {};

const store = configureStore(initialState)



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
