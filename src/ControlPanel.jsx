import React, { useState, useEffect } from 'react';
import axios from "axios";

const ControlPanel = () => {
    const [isRunning, setIsRunning] = useState(false);

    // Fetch the current status of ticket selling when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/api/sell/active')
            .then((response) => setIsRunning(response.data.isRunning))
            .catch((error) => console.error('Error fetching status:', error));
    }, []);

    // Handle start selling tickets
    const handleStart = () => {
        axios.post('http://localhost:8080/api/sell/start_sell')
            .then(() => setIsRunning(true))
            .catch((error) => console.error('Error starting:', error));
    };

    // Handle stop selling tickets
    const handleStop = () => {
        axios.post('http://localhost:8080/api/sell/stop')
            .then(() => setIsRunning(false))
            .catch((error) => console.error('Error stopping:', error));
    };

    return (
        <div>
            {isRunning ? (
                <button onClick={handleStop}>Stop Selling Tickets</button>
            ) : (
                <button onClick={handleStart}>Start Selling Tickets</button>
            )}
        </div>
    );
};

export default ControlPanel;
