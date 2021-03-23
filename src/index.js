/*                                  index.js
Description:    The creation point for our application. This is kinda where everything at the beginning initializes and the file before setting off and rendering anything that the user can see.
                Notable things that happen here:
                    -   The theme gets initialized as you'll see our palette being described here
                    -   The main "React element" and "React Router" start here and is what initializes "react" and the "react router" components of our system
                    -   The "Redux Store" gets configured here as well
                    -   Our "Firebase system" is initialized here
                    -   Our config file also gets loaded in here
*/

//Starting off we import some important node modules as variables

import dotenv from "dotenv";
dotenv.config(); //This is what imports the authentication vars and other env variables in the file /.env
import ReactDOM from "react-dom";
import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./js/components/App"; //Import our next main component to be rendered called App

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import configureStore from "./configureStore"; // Import our configure store function to configure our Redux Store

import "./css/defaultTheme.scss";

const initialState = {}; //This our initialized state. We may need to have some variables here at some point, but for now we can leave it empty...

const store = configureStore(initialState); // initialized store...

const Root = () => {
    //Creating our custom theme pallete between our 3 colors with light, dark and main versions of each color (different shades basically)
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: "#4481c2",
                dark: "#0f447d",
                main: "#1561b3",
            },
            secondary: {
                dark: "#e2ca05",
                light: "#fef9cd",
                main: "#fbe006",
            },
            neutral: {
                dark: "#37527c",
                light: "#7a90a1",
                main: "#4ba3b7",
            },
        },
        typography: {
            fontFamily: ["Open Sans", "Poppins"].join(","),
        },
    });
    //We are now returning an html element with React as a component and rendering it in our html file (src/index.html) in the element that has the id: 'root' which is a <div> in this case
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <App />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
};

ReactDOM.render(<Root />, document.getElementById("root")); //Calling our ReactDOM.render function to send our <Root> React element to the html <div id='root'> parent.

/*
From here you can go to:

    - index.html to see where the <Root /> element will be placed if you haven't seen already
    - <App /> or src/js/components/App.js to see what will render next in the app element after our initialized "React" element
    - configureStore() or src/configureStore.js to see what functions configure the "Redux Store"

Hint: Usually in your code editor (I'm using VS code) you can ctrl+click on elements in React and other functions and it'll take you to their files
*/
