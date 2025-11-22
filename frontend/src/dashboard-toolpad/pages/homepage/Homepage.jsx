import React, {useEffect, useRef} from 'react';
import { Box, Button, AppBar, Toolbar, Typography, Container, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import lottie from 'lottie-web';
import MARKETINGICON from '../../../assets/marketing.json?url';
import MESSAGINGICON from '../../../assets/message.json?url';
import SECUREICON from '../../../assets/secure.json?url';
import {defineElement} from "@lordicon/element";

export default function Homepage() {

    defineElement(lottie.animation);

    const navigate = useNavigate();

    //required for lordicon
    const playerRef = useRef(null);

    useEffect(() => {
        playerRef.current?.playFromBeginning();
        }, [])

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
{/*                            <img
                                src="/campus_connect_icon_transparent.png"
                                alt="CampusConnect"
                                style={{ height: 40 }}
                            />*/}
                        </Typography>
                        <Button
                            color="primary"
                            onClick={() => navigate('/signin')}
                            sx={{ mx: 1 }}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={{ mt: .5 }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item="true" xs={12} md={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <img
                                    src="/campus_connect-logo.png"
                                    alt="CampusConnect"
                                    style={{ height: 130 }}
                                />
                            </Typography>
                            <Typography variant="h2" component="h1" gutterBottom>
                                    Your One-Stop Shop for Student Life
                            </Typography>
                            <Typography variant="h5" color="text.secondary" paragraph>
                                Connect, Buy, Sell, and Thrive in Your Campus Community
                            </Typography>
{/*                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                                sx={{ mt: 2 }}
                            >
                                Get Started
                            </Button>*/}
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                p: 3,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                background: '#128509',
                                height: 200,
                                width: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                <lord-icon
                                    trigger="hover"
                                    src={MARKETINGICON}
                                    style={{width: '100px', height: '100px'}}
                                >
                                </lord-icon>
                                <Typography variant="h5" gutterBottom sx={{
                                    color: '#e4f1e4',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                                }}>
                                    E-commerce Marketplace
                                </Typography>
                                <Typography>
                                    Buy and sell products/services within your campus community
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                p: 3,
                                border: '1px solid #e0e0e0',
                                backgroundColor: '#3a8d87',
                                borderRadius: 2,
                                height:200,
                                width: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <lord-icon
                                    trigger="hover"
                                    src={MESSAGINGICON}
                                    style={{width: '100px', height: '100px'}}
                                >
                                </lord-icon>
                                <Typography variant="h5" gutterBottom>
                                    Direct Messaging
                                </Typography>
                                <Typography>
                                    Communicate directly with buyers and sellers
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                p: 3,
                                border: '1px solid #e0e0e0',
                                backgroundColor: '#41E8AC',
                                borderRadius: 2,
                                height:200,
                                width: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <lord-icon
                                    trigger="hover"
                                    src={SECUREICON}
                                    style={{width: '100px', height: '100px'}}
                                >
                                </lord-icon>
                                <Typography variant="h5" gutterBottom>
                                    Secure Platform
                                </Typography>
                                <Typography>
                                    University email verification for trusted transactions
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box
                component="footer"
                sx={{
                    mt: 8,
                    py: 3,
                    textAlign: 'center',
                    borderTop: '1px solid #e0e0e0'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Copyright © 2024 - Team NullPointer
                </Typography>
            </Box>
        </Box>

    );
}