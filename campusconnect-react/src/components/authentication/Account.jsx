import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

export default function Account() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        image: '/default-avatar.png'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserData({
                name: decoded.name || 'User',
                email: decoded.email,
                image: decoded.image || '/default-avatar.png'
            });
        }
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenu}>
                <Avatar src={userData.image} alt={userData.name} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1">{userData.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {userData.email}
                    </Typography>
                </Box>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </Box>
    );
}