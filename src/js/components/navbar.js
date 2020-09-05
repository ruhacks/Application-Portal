import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className="menu" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" className="random"></Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
