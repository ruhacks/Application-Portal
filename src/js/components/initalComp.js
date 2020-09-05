import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './navbar.js';

const InitalComp = () => {
    const [state, setState] = React.useState({
        open: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open})
    };

    return (
        <div>
            <NavBar></NavBar>
            <Container maxWidth="sm"></Container>
        </div>
    );
};

export default InitalComp;
