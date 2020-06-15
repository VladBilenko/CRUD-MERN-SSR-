import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavList = ({navConfig, toggleDrawer, onLogout}) => {
    return (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {navConfig.map(({label, url, icon}) => (
                    <ListItem button key={url}>
                        <Link className='nav__link' to={url}>
                            {icon}
                            <ListItemText primary={label}/>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem button key={'logout'} onClick={onLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'}/>
                </ListItem>
            </List>
        </div>
    );
};

export default NavList;