import React, {useEffect, useState} from 'react';
import {
    Box,
    Modal,
    TextField,
    Button,
    Typography,
    Divider
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function Profile({ onClose, session, authentication }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        currentPassword: '',
        newPassword: ''
    });

    const getUserId = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const userId = getUserId();
        if (userId) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/profile/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.user?.token}`
                        }
                    }
                );
                setFormData(prev => ({
                    ...prev,
                    name: response.data.name
                }));
            } catch (error) {
                if (error.response?.status === 403) {
                    console.error('Access forbidden: User not authorized to view this profile');
                } else {
                    console.error('Error fetching profile:', error);
                }
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = getUserId();
        if (!userId) return;

        try {
            const response = await axios.put(
                `http://localhost:8080/user/profile/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.token}`
                    }
                }
            );

            if (response.data) {
                handleClose();
                // Refresh user data in session
                authentication.signIn(session?.user?.token);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <PageContainer>
        <Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">{session?.user?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {session?.user?.email}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
                <Button fullWidth onClick={handleOpen}>
                    Manage Profile
                </Button>
                <Button fullWidth onClick={authentication.signOut} color="error">
                    Sign Out
                </Button>
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            margin="normal"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Current Password"
                            margin="normal"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="New Password"
                            margin="normal"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        />
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button variant="contained" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
        </PageContainer>
    );
}