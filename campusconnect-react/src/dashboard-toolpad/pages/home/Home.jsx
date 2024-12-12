import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '../../../assets/searchIcon.json?url';
import { useTheme } from '@mui/material/styles';
import {defineElement} from "@lordicon/element";
import lottie from "lottie-web";
import EditProfileIcon from "../../../assets/editProfile3.json";

defineElement(lottie.animation);

const Home = () => {
    const theme = useTheme();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const textFieldRef = useRef(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/API/productlisting/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setListings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    const handleCardClick = (listing) => {
        setSelectedListing(listing);
        setOpenDetailDialog(true);
    };

    const handleMessage = (e, sellerId) => {
        e.stopPropagation();
        console.log('Message seller with ID:', sellerId);
    };

    const filteredListings = listings.filter(listing =>
        listing.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.product_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <PageContainer>
            <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mb: 3, width: '91%' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <lord-icon
                                    trigger="hover"
                                    src={SearchIcon}
                                    style={{width: '32px', height: '32px'}}
                                />
                            </InputAdornment>
                        ),
                    }}
                    ref={textFieldRef}
                    />
                <Grid container spacing={3}>
                {filteredListings.map((listing) => (
                        <Grid xs={12} sm={6} md={4} key={listing.id}>
                            <Card
                                sx={{
                                    width: 320,
                                    height: 500,
                                    m: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.4s ease-in-out',
                                    backgroundColor: theme.palette.background.paper,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[10],
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(rgba(66, 66, 66, 0.9), rgba(66, 66, 66, 0.9))'
                                            : 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))',
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={() => handleCardClick(listing)}
                            >
                                <CardMedia
                                    component="img"
                                    height={250}
                                    image={`http://localhost:5173${listing.image}`}
                                    alt={listing.product_title}
                                    sx={{ objectFit: 'cover', width: '100%' }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 2, height: 250 }}>
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                                            Seller: {listing.user.name}
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', color: theme.palette.primary.main, fontWeight: '500' }}>
                                            {listing.product_title}
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            ₱{listing.price}
                                        </Typography>
                                        <Typography sx={{ mb: 1 }}>
                                            {listing.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                                            {listing.product_description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                                            <Tooltip title="Message Seller">
                                                <IconButton onClick={(e) => handleMessage(e, listing.user.id)} color="primary">
                                                    <MessageIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Dialog
                open={openDetailDialog}
                onClose={() => setOpenDetailDialog(false)}
                maxWidth="md"
                fullWidth
            >
                {selectedListing && (
                    <>
                        <DialogTitle>{selectedListing.product_title}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <img
                                    src={`http://localhost:5173${selectedListing.image}`}
                                    alt={selectedListing.product_title}
                                    style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                                />
                                <Typography variant="h6">
                                    Price: ₱{selectedListing.price}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Category: {selectedListing.category}
                                </Typography>
                                <Typography>
                                    {selectedListing.product_description}
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDetailDialog(false)}>
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </PageContainer>
    );
};

export default Home;
