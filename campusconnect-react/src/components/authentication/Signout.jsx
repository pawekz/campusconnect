import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Button
            variant="outlined"
            color="inherit"
            onClick={handleSignOut}
            startIcon={<LogoutIcon />}
        >
            Sign Out
        </Button>
    );
}