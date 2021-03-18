/*                                  auth.js
Description:    Initializes state variables regarding authentication. Then whenever an action is dispatched like LOGIN_REQUEST it adjusts the state variables accordingly.
                This reducer function will be called everytime an action is dispatched from ../actions/authActions
                Notable things that happen here:
                    -   Take action type (like LOGIN_REQUEST) and adjust the redux store state variables that are being used by various components

                     
*/
import {
    GET_HACAKTHON_DATE,
    SET_HACAKTHON_DATE,
    ERROR_HACKATHON_DATE,
} from "../actions/hackathonActions";

export default (
    state = {
        gettingDates: false,
        hackInfo: {},
        err: {},
    },
    action
) => {
    switch (action.type) {
        case GET_HACAKTHON_DATE:
            return {
                ...state,
                gettingDates: true,
            };

        case SET_HACAKTHON_DATE:
            return {
                ...state,
                gettingDates: false,
                hackInfo: action.date,
            };

        case ERROR_HACKATHON_DATE:
            return {
                ...state,
                gettingDates: false,
                err: action.err,
            };
        default:
            return state;
    }
};

/* 
From here you can go to:
    -   authActions in src/redux/actions/authActions to see what the loginUser function does when dispatched with a user email and password and where these actions comes from if you haven't seen it
*/
