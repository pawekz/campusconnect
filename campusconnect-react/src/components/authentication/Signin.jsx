import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData) => {
    try {
        const response = await axios.post('http://localhost:8080/user/login', {
            email: formData.get('email'),
            password: formData.get('password')
        });

        console.table({
            'Response Status': response.status,
            'Response Data': response.data
        });

        if (response.status === 200 && response.data.token) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Token stored in localStorage:', localStorage.getItem('token'));
            return true;
        }
    } catch (error) {
        console.error('Authentication failed:', error);
    }
    return false;
}

export default function CredentialsSignInPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSignIn = async (provider, formData) => {
        const success = await signIn(provider, formData);
        console.table({
            'Sign In Success': success
        });
        if (success) {
            console.log('Navigating to /dashboard-toolpad');
            navigate('/dashboard-toolpad', { replace: true });
        } else {
            console.error('Sign in failed, not navigating');
        }
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage signIn={handleSignIn} providers={providers} />
        </AppProvider>
    );
}