/*                                  configureStore.js
Description:    This is where we configure our "Redux Store" with thunk middleware and our own logger middleware
                Notable things that happen here:
                    -   We enable our middleware for action logging and thunk middleware (allows you to call action creators that return a function instead of an action object) in our store
                    -   Call createStore function from redux with our entire map of reducers in the variable called 'rootReducer', the intial state and our enhancers/middleware (same thing in this context)
                    -   Dispatch an action in our auth.js that verifies if there is a user logged in or not
                     
*/
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger"; //Our logging middleware
import rootReducer from "./redux/reducers/"; //Our root reducer map that contains ALL our reducers
import { verifyAuth } from "./redux/actions"; //Import the authentication verification action function that checks for a user

export default function configureStore(preloadedState) {
    //const middlewares = [loggerMiddleware, thunkMiddleware]; //dev
    const middlewares = [thunkMiddleware]; //prod
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
    const composedEnhancers = compose(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers); // init store
    store.dispatch(verifyAuth()); //dispatch verifyAuth action
    return store;
}

/*
From here you can go to:
    -   rootReducer from src/redux/reducers/index.js to see what a reducer is and to explore how a reducer is related to an action
    -   authActions imported from src/redux/actions/index.js to see what actions are and to explore how an action is related to a reducer

*/
