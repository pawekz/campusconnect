import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem , Typography} from '@mui/material';

const CATEGORIES = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Books', label: 'Books' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Toys', label: 'Toys' },
    { value: 'Others', label: 'Others' }
];

const EditListingModal = ({
    open,
    onClose,
    listingToEdit,
    editFormData,
    setEditFormData,
    onConfirmEdit
}) => {
    const handleInputChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    name="product_title"
                    label="Title"
                    value={editFormData.product_title}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    name="product_description"
                    label="Description"
                    value={editFormData.product_description}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    value={editFormData.price}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    select
                    fullWidth
                    name="category"
                    label="Category"
                    value={editFormData.category}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                >
                    {CATEGORIES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                        color: 'text.secondary',
                        fontStyle: 'italic'
                    }}
                >
                    Posted by: {listingToEdit?.user?.name}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirmEdit} variant="contained" color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditListingModal;