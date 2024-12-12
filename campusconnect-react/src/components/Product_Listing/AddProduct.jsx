import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { TextField, Button, Grid, FormControl, Typography, Select, MenuItem, InputLabel, Modal, Box } from '@mui/material';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { useNavigate } from 'react-router-dom';
import {PageContainer} from "@toolpad/core/PageContainer";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
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

export default function AddProduct() {
    const methods = useForm();
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState();
    const [images, setImages] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products/getAllProducts');
            setProducts(response.data);
            console.log('Products:', response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const onSubmit = async (data) => {
        data.image = file;
        try {
            const productResponse = await axios.post('http://localhost:8080/products', data);

            // Create chat token after product is created
            const chatData = {
                sender_id: JSON.parse(localStorage.getItem('user')).id, // Current user
                receiver_id: productResponse.data.userId, // Product owner's ID
                product_id: productResponse.data.id
            };

            await axios.post('http://localhost:8080/message/createChatToken', chatData);

            fetchProducts();
            setOpen(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8080/products/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const imageUrl = response.data;
                setFile(imageUrl);
                setImages([...images, imageUrl]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleClose = () => {
        setOpen(false);
        methods.reset(); // Reset the form fields
    };

    return (
        <PageContainer>
        <FormProvider {...methods}>
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                ADD PRODUCTS
            </Typography>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Product Title"
                                {...methods.register('product_title', { required: true })}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Product Description"
                                {...methods.register('product_description', { required: true })}
                                multiline
                                minRows={3}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Price"
                                type="number"
                                {...methods.register('price', { required: true })}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Controller
                                name="category"
                                control={methods.control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        labelId="category-label"
                                        label="Category"
                                        {...field}
                                        required
                                    >
                                        <MenuItem value="Electronics">Electronics</MenuItem>
                                        <MenuItem value="Books">Books</MenuItem>
                                        <MenuItem value="Clothing">Clothing</MenuItem>
                                        <MenuItem value="Furniture">Furniture</MenuItem>
                                        <MenuItem value="Toys">Toys</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                            {file && (
                                <AutoPlaySwipeableViews
                                    index={activeStep}
                                    onChangeIndex={handleStepChange}
                                    enableMouseEvents
                                    style={{ height: 200, marginTop: '10px' }}
                                >
                                    {images.map((image, index) => (
                                        <img key={index} src={image} alt={`product_image_${index}`} style={{ width: '100%', height: 'auto' }} />
                                    ))}
                                </AutoPlaySwipeableViews>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Create Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Successfully created the product!
                    </Typography>
                    <br/>
                    <section style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            aria-setsize={400}
                            align="left"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            aria-setsize={400}
                            align="right"
                            onClick={() => navigate('/viewproducts')}
                        >
                            View Product List
                        </Button>
                    </section>
                </Box>
            </Modal>
        </FormProvider>
        </PageContainer>
    );
}