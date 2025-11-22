import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const DeleteUserModal = ({
                             open,
                             onClose,
                             userToDelete,
                             confirmationName,
                             setConfirmationName,
                             onConfirmDelete
                         }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Confirm Delete Account</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete this account? This action cannot be undone.
                </Typography>
                <Typography variant="body2" color="error" gutterBottom>
                    To confirm, please type the full name: <b>{userToDelete?.name}</b>
                </Typography>
                <TextField
                    fullWidth
                    value={confirmationName}
                    onChange={(e) => setConfirmationName(e.target.value)}
                    margin="dense"
                    label="Type full name to confirm"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirmDelete}
                    color="error"
                    disabled={confirmationName !== (userToDelete?.name || '')}
                >
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserModal;
