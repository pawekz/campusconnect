import React, {useEffect} from 'react';
import { Dialog, DialogContent, IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ChevronLeftIcon from '../../../assets/chevronLeftIcon.json?url';
import ChevronRightIcon from '../../../assets/chevronRightIcon.json?url';
import {defineElement} from "@lordicon/element";
import lottie from "lottie-web";
import { useTheme } from '@mui/material/styles';

defineElement(lottie.animation);

const CategoryListingsModal = ({
    open,
    onClose,
    listings,
    currentIndex,
    onNext,
    onPrevious
}) => {
    const theme = useTheme();

    useEffect(() => {
        console.table({
            'Modal State': {
                'Modal Open': open,
                'Listings Count': listings.length,
                'Current Index': currentIndex,
                'Has Listings': listings && listings.length > 0,
                'Current Listing': listings[currentIndex]
            }
        });
    }, [open, listings, currentIndex]);

    return (
        <Dialog
            open={open}
            onClose={() => {
                console.table({
                    'Modal Closing': {
                        'Final Index': currentIndex,
                        'Total Listings': listings.length
                    }
                });
                onClose();
            }}
            maxWidth="md"
            fullWidth
        >
            <DialogContent sx={{ position: 'relative', p: 3 }}>
                {listings.length > 0 && (
                    <>
                        <Card sx={{
                            width: 320, // Fixed width like in ViewAllListing
                            height: 500, // Fixed height like in ViewAllListing
                            m: 'auto',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <CardMedia
                                component="img"
                                height={250} // Fixed image height
                                image={`http://localhost:5173${listings[currentIndex].image}`}
                                alt={listings[currentIndex].product_title}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2,
                                height: 250 // Fixed content height
                            }}>
                                <Typography variant="h6" sx={{color: theme.palette.primary.main, fontWeight: '500'}}>
                                    {listings[currentIndex].product_title}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    ₱{listings[currentIndex].price}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {listings[currentIndex].product_description}
                                </Typography>
                            </CardContent>
                        </Card>

                        <IconButton
                            onClick={onPrevious}
                            sx={{position: 'absolute', left: 10, top: '50%'}}
                        >
                            <lord-icon
                                trigger="hover"
                                src={ChevronLeftIcon}
                                style={{width: '32px', height: '32px'}}
                            />
                        </IconButton>
                        <IconButton
                            onClick={onNext}
                            sx={{position: 'absolute', right: 10, top: '50%'}}
                        >
                            <lord-icon
                                trigger="hover"
                                src={ChevronRightIcon}
                                style={{width: '32px', height: '32px'}}
                            />
                        </IconButton>

                        <Typography sx={{textAlign: 'center', mt: 2}}>
                            {currentIndex + 1} of {listings.length}
                        </Typography>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CategoryListingsModal;