import dotenv from 'dotenv';
dotenv.config();

import ReactDOM from 'react-dom';
import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './js/components/App';

import { Provider } from 'react-redux';

import 'firebase/auth';
import 'firebase/firestore';

import { BrowserRouter } from 'react-router-dom';

import configureStore from './configureStore';

const initialState = {};

const store = configureStore(initialState);

const Root = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#3159a8',
                dark: '#17193d',
                main: '#264288',
            },
            secondary: {
                dark: '#fbe006',
                light: '#fbeebb',
                main: '#f6e17e',
            },
            neutral: {
                dark: '#37527c',
                light: '#7a90a1',
                main: '#4ba3b7',
            },
            success: {
                main: '#4caf50',
                light: '#81c784',
                dark: '#388e3c',
            },
        },
    });
    return (
        <div className="App">
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <MuiThemeProvider theme={theme}>
                            <App />
                        </MuiThemeProvider>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
