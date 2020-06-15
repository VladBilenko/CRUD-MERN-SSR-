import React, {useEffect} from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import List from "@material-ui/core/List";
import Dashboard from "../dashboard";
import {ListItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import styles from './index.scss';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";

const {notation: {getAllNotations, updateNotation, clearData}} = actions;

const NotationsList = () => {
    const dispatch = useDispatch();
    const notations = useSelector(state => (state.notations.list));

    useEffect(() => {
        dispatch(getAllNotations());

        return () => {
            dispatch(clearData());
        }
    }, []);

    const handleToggle = (id) => () => {
        const notationIdx = notations.findIndex(({_id}) => _id === id);
        const notation = notations[notationIdx];

        const updatedNotation = {
            ...notation,
            completed: !notation.completed
        };

        dispatch(updateNotation(updatedNotation));
    };

    return (
        <Dashboard title='Notations'>
            <List dense>
                {notations ? notations.map(({_id, title, completed}) => {
                    const labelId = `checkbox-list-secondary-label-${_id}`;

                    return (
                        <ListItem key={_id} button={true} divider={true}>
                            <Link className='notation__link' to={`/notations/${_id}`}>
                                <ListItemText id={labelId} primary={title}/>
                            </Link>
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(_id)}
                                    checked={completed}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                }) : null}
            </List>
        </Dashboard>
    );
};

export default withStyles(styles)(NotationsList);