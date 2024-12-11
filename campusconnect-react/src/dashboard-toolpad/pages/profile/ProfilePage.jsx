import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import {
    TextField,
    Button,
    Typography,
    Modal,
    Box,
    Alert,
    Card,
    CardContent,
    Container,
    Avatar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { PageContainer } from "@toolpad/core/PageContainer";
import ProfilePic from '../../../assets/iconProfile.json?url';
import lottie from "lottie-web";
import {defineElement} from "@lordicon/element";
import LogOutPic from '../../../assets/logOut.json?url';

defineElement(lottie.animation);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProfilePage = ({ authentication }) => {
    const methods = useForm();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.user_id;
    const [showAlert, setShowAlert] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/signin';
    };
    const [profileData, setProfileData] = useState({
        name: decoded.name || '',
        email: decoded.sub || '',
        userType: decoded.user_type || ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                methods.reset(response.data);
            } catch (error) {
                setError('Failed to fetch profile data');
            }
        };
        fetchProfile();
    }, [userId, token, methods]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:8080/user/profile/${userId}`, {
                name: profileData.name,  // This ensures the name is sent
                password: data.password,
                email: profileData.email,
                user_type: profileData.userType
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setError('Failed to update profile');
        }
    };


    const handleClose = () => {
        setOpen(false);
        methods.reset();
    };

    return (
        <PageContainer>
            <FormProvider {...methods}>
                <Container maxWidth="lg">
                    <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                        PROFILE MANAGEMENT
                    </Typography>
                    {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
                    {showAlert &&
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Profile updated successfully!
                        </Alert>
                    }
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        mb: 3
                                    }}>
                                        <lord-icon
                                            trigger="hover"
                                            src={ProfilePic}
                                            style={{width: '64px', height: '64px'}}
                                        >
                                        </lord-icon>
                                        <Typography variant="h6">{profileData.name}</Typography>
                                        <Typography color="textSecondary">{profileData.userType}</Typography>
                                    </Box>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => {
                                            console.log('Sign Out button clicked');
                                            authentication.signOut();
                                        }}

                                        startIcon={
                                            <lord-icon
                                                trigger="hover"
                                                src={LogOutPic}
                                                style={{width: '52px', height: '52px'}}
                                            >
                                            </lord-icon>
                                        }
                                    >
                                        Sign Out
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={11} md={8}>
                            <Card>
                                <CardContent>
                                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                                        <Grid container spacing={4}>
                                            <Grid item xs={10}>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    Name
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData(prev => ({
                                                        ...prev,
                                                        name: e.target.value
                                                    }))}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    value={profileData.email}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    label="New Password"
                                                    type="password"
                                                    {...methods.register('password')}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    label="User Type"
                                                    value={profileData.userType}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                >
                                                    Update Profile
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                    >
                        <Box sx={style}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                Profile updated successfully!
                            </Typography>
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Box>
                    </Modal>
                </Container>
            </FormProvider>
        </PageContainer>
    );
};

ProfilePage.propTypes = {
    authentication: PropTypes.shape({
        signOut: PropTypes.func.isRequired
    }).isRequired
};

export default ProfilePage;