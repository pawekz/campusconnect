import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from "./axiosConfig.js";

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axiosInstance.get('/print')
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default App;