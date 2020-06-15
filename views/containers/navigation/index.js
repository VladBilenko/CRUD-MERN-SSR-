import React, {useState} from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from '@material-ui/icons/List';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import NavList from "../../components/nav-list";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import styles from './index.scss';
import {useDispatch} from "react-redux";
import ActionTypes from "../../store/action-types";

const {auth: {Logout}} = ActionTypes;

const NAV_CONFIG = [
    {
        label: 'Notations',
        url: '/notations',
        icon: (<ListItemIcon>
            <ListIcon/>
        </ListItemIcon>)
    },
    {
        label: 'Create notation',
        url: '/notations/new',
        icon: (<ListItemIcon>
            <NoteAddIcon/>
        </ListItemIcon>)
    },
    {
        label: 'Clock',
        url: '/clock',
        icon: (<ListItemIcon>
            <AccessTimeIcon/>
        </ListItemIcon>)
    }
];

const Navigation = () => {
    const [isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({type: Logout});
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpened(open);
    };

    return (
        <>
            <IconButton href='#' onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <Drawer anchor={'left'} open={isOpened} onClose={toggleDrawer(false)}>
                <NavList navConfig={NAV_CONFIG} toggleDrawer={toggleDrawer} onLogout={handleLogout}/>
            </Drawer>
        </>
    );
};

export default withStyles(styles)(Navigation);
