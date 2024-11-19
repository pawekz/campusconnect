import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        user_type: 'student' // Add user_type to the form data
    });
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for the popup

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@cit\.edu$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            alert("Email must be from the domain @cit.edu");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/user/save', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Form data submitted:", response.data);
            setOpenSnackbar(true); // Show success popup
            setFormData({ email: '', password: '', name: '', user_type: 'student' }); // Clear form fields
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Register
                    </Button>
                </form>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Registration successful!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}

export default RegistrationForm;
