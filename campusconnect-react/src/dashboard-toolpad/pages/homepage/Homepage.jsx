import React from 'react';
import { Box, Button, AppBar, Toolbar, Typography, Container, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import {PageContainer} from "@toolpad/core/PageContainer";

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/homepage.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.2,
                zIndex: -2,
                height: '100vh',
                width: '100%'
            }} />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img
                            src="/campus_connect_icon_transparent.png"
                            alt="CampusConnect"
                            style={{ height: 40 }}
                        />
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
                        onClick={() => navigate('/register')} //changed from `/register` to `/register2`
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Your One-Stop Shop for Student Life
                        </Typography>
                        <Typography variant="h5" color="text.secondary" paragraph>
                            Connect, Buy, Sell, and Thrive in Your Campus Community
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{ mt: 2 }}
                        >
                            Get Started
                        </Button>
                    </Grid>
                    {/*<Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="/homepage.jpg"
                            alt="Campus Life"
                            sx={{
                                width: '100%',
                                maxWidth: 600,
                                height: 'auto'
                            }}
                        />
                    </Grid>*/}
                </Grid>

                <Grid container spacing={4} sx={{ mt: 8 }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            E-commerce Marketplace
                        </Typography>
                        <Typography>
                            Buy and sell products/services within your campus community
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Direct Messaging
                        </Typography>
                        <Typography>
                            Communicate directly with buyers and sellers
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Secure Platform
                        </Typography>
                        <Typography>
                            University email verification for trusted transactions
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </Box>
    );
}
