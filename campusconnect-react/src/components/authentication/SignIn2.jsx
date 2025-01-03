import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn2(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [loginError, setLoginError] = React.useState('');

    const validateInputs = () => {
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        let isValid = true;
        const isValidCITEmail = /^[a-zA-Z0-9._%+-]+@cit\.edu$/.test(email.value);

        if (!email.value || !isValidCITEmail) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid "@cit.edu" email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 8 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions by checking if a request is already in progress
    if (isLoading) return;

    // Validate inputs before proceeding
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
        const formData = new FormData(event.currentTarget);
        const response = await axios.post('http://localhost:8080/user/login', {
            email: formData.get('email'),
            password: formData.get('password')
        });

        console.log('Login response:', response);

        if (response.status === 200 && response.data.token) {
            const token = response.data.token;
            console.log('Storing token in localStorage:', token);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Redirect to the dashboard after successful login
            navigate('/dashboard', { replace: true });
        }
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        setLoginError('Invalid credentials / Account does not exist');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <img src="/campus_connect-logo.png" alt="CampusConnect" style={{height: 'auto', width: 'auto'}}/>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}>
                        { loginError && (
                            <Alert severity="error" onClose={() => setLoginError('')}>
                                {loginError}
                            </Alert>
                        )}
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="sample@cit.edu"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                sx={{ariaLabel: 'email'}}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                            </Box>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                        <Typography sx={{textAlign: 'center'}}>
                            Don&apos;t have an account?{' '}
                            <Link
                                onClick={() => navigate('/register')}
                                variant="body2"
                                sx={{
                                    alignSelf: 'center',
                                    color: 'primary.main',
                                    '&:hover': {
                                        color: 'primary.dark',
                                    },
                                }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}