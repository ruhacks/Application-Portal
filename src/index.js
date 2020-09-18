import InitalComp from './js/components/initalComp';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <InitalComp />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('container'));
