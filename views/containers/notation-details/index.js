import React, {useEffect} from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Dashboard from "../dashboard";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styles from './index.scss';
import Button from "@material-ui/core/Button";
import actions from "../../store/actions";

const {notation: {getOneNotation, clearData}} = actions;

const NotationDetails = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.notations.details);
    const pathname = useSelector(state => state.router.location.pathname);

    useEffect(() => {
        const hash = pathname.split('/')[2];

        dispatch(getOneNotation(hash));

        return () => {
            dispatch(clearData())
        }
    }, []);

    return (
        <Dashboard title='Notation Details'>
            {
                details ?
                    <div className='details__container'>
                        <h2 className='details__title'>
                            {details.title}
                        </h2>
                        <p className='details__description'>
                            {details.description}
                        </p>
                        <p className='details__date'>
                            Expires at: {new Date(details.expiresAt).toString()}
                        </p>
                        <p className='details__completed'>
                            Completed: {details.completed ? 'Yes' : 'No'}
                        </p>
                        <Button variant="outlined" color="primary">
                            <Link className='details__link' to={`${pathname}/update`}>Update</Link>
                        </Button>
                    </div>
                    : null
            }
        </Dashboard>
    );
};

export default withStyles(styles)(NotationDetails);