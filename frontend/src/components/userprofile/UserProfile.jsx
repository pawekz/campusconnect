import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function UserProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [editMode, setEditMode] = useState({ name: false, password: false });

    useEffect(() => {
        // Fetch user data from the server
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/profile');
                setUserData(response.data);
            } catch (error) {
                console.error("There was an error fetching the user data!", error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSave = async (field) => {
        try {
            await axios.put(`http://localhost:8080/user/update${field}`, { [field]: userData[field] });
            setEditMode({ ...editMode, [field]: false });
        } catch (error) {
            console.error(`There was an error updating the ${field}!`, error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <Typography variant="h4" gutterBottom>
                    User Profile
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode.name}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={() => setEditMode({ ...editMode, name: !editMode.name })}>
                                    {editMode.name ? 'Save' : 'Edit'}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={userData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                <Button onClick={() => setEditMode({ ...editMode, password: !editMode.password })}>
                                    {editMode.password ? 'Save' : 'Edit'}
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </Container>
    );
}

export default UserProfile;