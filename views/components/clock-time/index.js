import React from 'react';
import styles from './index.scss';
import withStyles from "isomorphic-style-loader/withStyles";

const transformToValidTimeDigits = (digits) => (digits < 10 ? `0${digits}` : digits);

const ClockTime = ({milliseconds}) => {
    const date = new Date(milliseconds);
    const hours = transformToValidTimeDigits(date.getHours());
    const minutes = transformToValidTimeDigits(date.getMinutes());
    const seconds = transformToValidTimeDigits(date.getSeconds());

    return (
        <div className='clock'>{hours}:{minutes}:{seconds}</div>
    );
};

export default withStyles(styles)(ClockTime);