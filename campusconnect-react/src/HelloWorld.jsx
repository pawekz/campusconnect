import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelloWorld() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/account/print')
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="App">
            <div>{message}</div> {/* Display the message here */}
        </div>
    );
}

export default HelloWorld;