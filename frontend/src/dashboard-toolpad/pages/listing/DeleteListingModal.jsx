import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const DeleteListingModal = ({
    open,
    onClose,
    listingToDelete,
    confirmationTitle,
    setConfirmationTitle,
    onConfirmDelete
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Confirm Delete Listing</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete this listing? This action cannot be undone.
                </Typography>
                <Typography variant="body2" color="error" gutterBottom>
                    To confirm, please type the title: <b>{listingToDelete?.product_title}</b>
                </Typography>
                <TextField
                    fullWidth
                    value={confirmationTitle}
                    onChange={(e) => setConfirmationTitle(e.target.value)}
                    margin="dense"
                    label="Type title to confirm"
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
                    disabled={confirmationTitle !== (listingToDelete?.product_title || '')}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteListingModal;