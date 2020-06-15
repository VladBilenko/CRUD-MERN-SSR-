import React, {useEffect, useState} from 'react';
import Dashboard from "../dashboard";
import ClockTime from '../../components/clock-time';
import io from 'socket.io-client';

const Clock = () => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const socket = io('https://localhost:3000', {
            path: '/api/clock'
        });

        socket.on('message', (message) => {
            setTime(message);
        });

        return () => {
            socket.close();
        }
    }, []);

    return (
        <Dashboard title='Clock'>
            { time ? <ClockTime milliseconds={time} /> : null }
        </Dashboard>
    );
};

export default Clock;