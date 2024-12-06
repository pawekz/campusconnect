import React, { useState } from 'react';
import axios from 'axios';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { TextField, Button, Grid, FormControl, Typography, Select, MenuItem, InputLabel, Modal, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from "@toolpad/core/PageContainer";

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
    const [file, setFile] = useState();
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;
        const imagePath = `/src/assets/productImage/${file.name}`;

        // Create URL with query parameters
        const url = new URL('http://localhost:8080/products');
        url.searchParams.append('userId', userId);
        url.searchParams.append('imagePath', imagePath);

        const productData = {
            product_title: data.product_title,
            product_description: data.product_description,
            price: parseFloat(data.price),
            category: data.category
        };

        try {
            const response = await axios.post(url.toString(), productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.table({
                requestUrl: url.toString(),
                requestData: productData,
                responseStatus: response.status
            });

            setOpen(true);
        } catch (error) {
            console.table({
                errorStatus: error.response?.status,
                errorMessage: error.response?.data,
                requestUrl: url.toString(),
                requestData: productData
            });
        }
    };



    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setOpen(false);
        methods.reset();
    };

    return (
        <PageContainer>
            <FormProvider {...methods}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                    ADD PRODUCTS
                </Typography>
                {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
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
                                    <img
                                        src={images[0]}
                                        alt="product_image"
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            objectFit: 'cover',
                                            marginTop: '10px'
                                        }}
                                    />
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
                                Add Listing
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
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
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