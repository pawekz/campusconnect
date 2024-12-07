import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography } from '@mui/material';

const USER_TYPES = [
    { value: 'student', label: 'Student' },
    { value: 'admin', label: 'Admin' }
];

const EditUserModal = ({
                           open,
                           onClose,
                           userToEdit,
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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Edit User Account</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    select
                    fullWidth
                    name="user_type"
                    label="User Type"
                    value={editFormData.user_type}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                >
                    {USER_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirmEdit}
                    color="primary"
                    variant="contained"
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
