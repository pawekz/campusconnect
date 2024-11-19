import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];
const signIn = async (provider, formData) => {
    try {
        console.table({
            email: formData.get('email'),
            password: formData.get('password')
        });

        const response = await axios.post('http://localhost:8080/user/login', {
            email: formData.get('email'),
            password: formData.get('password')
        });

        console.table({
            responseStatus: response.status,
            token: response.data.token,
            fullResponse: response.data
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.table({
            error: error.message,
            response: error.response?.data
        });
        throw new Error('Invalid credentials');
    }
};

const handleSignIn = async (provider, formData) => {
    try {
        const success = await signIn(provider, formData);
        console.table({
            signInSuccess: success,
            currentToken: localStorage.getItem('token')
        });

        if (success) {
            navigate('/dashboard-toolpad');
        }
    } catch (error) {
        console.table({
            signInError: error.message
        });
    }
};

const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
};

export default function CredentialsSignInPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleSignIn = async (provider, formData) => {
        try {
            const success = await signIn(provider, formData);
            if (success && localStorage.getItem('token')) {
                navigate('/dashboard-toolpad', {replace: true});  // Redirects to Dashboard-toolpad.jsx
            }
        } catch (error) {
            console.table({
                signInError: error.message
            });
        }
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage signIn={handleSignIn} providers={providers} />
        </AppProvider>
    );
}

