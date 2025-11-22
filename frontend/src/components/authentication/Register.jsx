import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/save', {
                ...formData,
                user_type: 'STUDENT' // Default user type
            });
            if (response.status === 200) {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('Email is already in use');
            } else {
                console.error('Registration failed:', error);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Register for CampusConnect
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Institution Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => navigate('/signin')}
                        >
                            Already have an account? Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}