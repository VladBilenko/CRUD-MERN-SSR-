import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import withStyles from 'isomorphic-style-loader/withStyles';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import styles from './index.scss';

const INITIAL_FORM_STATE = {username: '', password: ''};

const Authorization = ({title, actionType}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const element = event.target;
        const value = element.value;
        const key = event.target.getAttribute('id');

        setFormData((currData) => ({...currData, [key]: value}))
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch({type: actionType, data: formData});
    };

    return (
        <div className='authorization__container'>
            <nav>
                <ul className='authorization__nav-container'>
                    <li><NavLink className='authorization__nav-link' to={'/sign-in'}>Sign in</NavLink></li>
                    <li><NavLink className='authorization__nav-link' to={'/sign-up'}>Sign up</NavLink></li>
                </ul>
            </nav>
            <div>
                <h1 className='authorization__title'>
                    {title}
                </h1>
                <form className='authorization__form' onSubmit={handleFormSubmit} noValidate autoComplete="off">
                    <TextField className='authorization__input' id="username" label="Username" value={formData.username}
                               onChange={handleInputChange} variant='standard' />
                    <TextField className='authorization__input' id="password" type="password" value={formData.password}
                               onChange={handleInputChange} label="Password"/>
                    <Button type='submit' variant="outlined" color="primary">{title}</Button>
                </form>
            </div>
        </div>
    );
};

export default withStyles(styles)(Authorization);