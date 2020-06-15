import React, {useEffect, useMemo, useState} from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Dashboard from "../dashboard";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DatePicker from "../../components/date-picker";
import styles from './index.scss';
import actions from "../../store/actions";
import {NotationFormStrategies} from "../../constants";

const {notation: {getOneNotation, deleteNotation, clearData}} = actions;

const INITIAL_FORM_STATE = {
    title: '',
    description: '',
    expiresAt: new Date().getTime(),
    completed: false
};

const NotationForm = ({strategyType}) => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.notations.details);
    const pathname = useSelector(state => state.router.location.pathname);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    const strategy = useMemo(
        () => NotationFormStrategies[strategyType], [strategyType]);

    useEffect(() => {
        if (strategy.isNeedHash) {
            const hash = pathname.split('/')[2];

            dispatch(getOneNotation(hash));
        }

        return () => {
            dispatch(clearData());
        }
    }, []);

    useEffect(() => {
        if (details) {
            setFormData(details);
        }
    }, [details]);

    const handleInputChange = ({target}) => {
        const {value} = target;
        const key = target.getAttribute('id');

        setFormData((currData) => ({...currData, [key]: value}))
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const {action} = strategy;

        dispatch(action(formData));
    };

    const handleDelete = () => {
        dispatch(deleteNotation(formData._id))
    };

    const handleDateChange = (date) => {
        setFormData((curr) => ({...curr, expiresAt: date}));
    };

    const handleSwitchChange = (event) => {
        setFormData((curr) => ({...curr, completed: event.target.checked}));
    };

    return (
        <Dashboard title={strategy.title}>
            <form className='form__container' onSubmit={handleFormSubmit} noValidate autoComplete="off">
                <TextField className='form__input' id="title" label="Title" value={formData.title}
                           onChange={handleInputChange}/>
                <TextField className='form__input form__input_lg' multiline id="description" value={formData.description}
                           onChange={handleInputChange} label="Description"/>
               <DatePicker formData={formData} onDateChange={handleDateChange} />
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.completed}
                            onChange={handleSwitchChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Completed"
                />
                <div className='form__buttons'>
                    <Button className='form__submit' type='submit' variant="outlined" color="primary">{strategy.title}</Button>
                    {
                        strategy.isDeleteButton ?
                            <Button onClick={handleDelete} type='button' variant="outlined"
                                    color="secondary">Delete</Button> : null
                    }
                </div>
            </form>

        </Dashboard>
    );
};

export default withStyles(styles)(NotationForm);