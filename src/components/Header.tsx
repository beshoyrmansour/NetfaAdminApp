import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

import logo from '../logo.svg';

interface Props {
    value: number;
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            justifyContent:'center'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: theme.palette.text.secondary,
        },
    }),
);

const Header = (props: Props) => {
    const {
        value,
        handleChange
    } = props
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.root}>
                <img src={logo} className="App-logo" alt="logo" />
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton> */}
            </Toolbar>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                <Tab label="المنتجات" id='simple-tab-0' aria-controls='simple-tabpanel-0' />
                <Tab label="الطلبات" id='simple-tab-1' aria-controls='simple-tabpanel-1' />
                <Tab label="المستخدمين" id='simple-tab-2' aria-controls='simple-tabpanel-2' />
                <Tab label="الإعدادات" id='simple-tab-3' aria-controls='simple-tabpanel-3' />
            </Tabs>
        </AppBar>
    )
}

export default Header
