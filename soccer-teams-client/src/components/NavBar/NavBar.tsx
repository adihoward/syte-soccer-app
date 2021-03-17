import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export function NavBar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Soccer Teams
          </Typography>
            </Toolbar>
        </AppBar>
    )
}