import React, { useState, useEffect } from 'react';
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
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteListingModal from './DeleteListingModal.jsx';
import EditListingModal from './EditListingModal.jsx';

const ViewAllListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [confirmationTitle, setConfirmationTitle] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [listingToEdit, setListingToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    product_title: '',
    product_description: '',
    price: '',
    category: ''
  });
  const [selectedListing, setSelectedListing] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/API/product-listing/all', {
          headers: {
            'Authorization': `Bearer ${token}`
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

  const handleEditPrompt = (listing) => {
    setListingToEdit(listing);
    setEditFormData({
      product_title: listing.product_title,
      product_description: listing.product_description,
      price: listing.price,
      category: listing.category
    });
    setOpenEditDialog(true);
  };

  const handleConfirmEdit = () => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:8080/API/product-listing/${listingToEdit.id}`, editFormData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setListings(listings.map(listing =>
        listing.id === listingToEdit.id
          ? {...listing, ...editFormData}
          : listing
      ));
      setOpenEditDialog(false);
      setListingToEdit(null);
    })
    .catch(error => {
      console.error('Error updating listing:', error);
    });
  };

  const handleDeletePrompt = (listing) => {
    setListingToDelete(listing);
    setOpenDeleteDialog(true);
    setConfirmationTitle('');
  };

  const handleConfirmDelete = () => {
    if (listingToDelete && confirmationTitle === listingToDelete.product_title) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:8080/API/product-listing/${listingToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        setListings(listings.filter(listing => listing.id !== listingToDelete.id));
        setOpenDeleteDialog(false);
        setListingToDelete(null);
        setConfirmationTitle('');
      })
      .catch(error => {
        console.error('Error deleting listing:', error);
      });
    }
  };

  const handleCardClick = (listing) => {
    setSelectedListing(listing);
    setOpenDetailDialog(true);
  };

  return (
    <PageContainer>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid xs={12} sm={6} md={4} key={listing.id}>
                <Card
                    sx={{
                        width: 320, // fixed ang width
                        height: 500,
                        m: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))',
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
                  sx={{
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    height: 250
                  }}
                >
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {listing.product_title}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      ₱{listing.price}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      {listing.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {listing.product_description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 'auto'
                      }}
                    >
                      <Tooltip title="Edit Listing">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPrompt(listing);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Listing">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePrompt(listing);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
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

      <DeleteListingModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        listingToDelete={listingToDelete}
        confirmationTitle={confirmationTitle}
        setConfirmationTitle={setConfirmationTitle}
        onConfirmDelete={handleConfirmDelete}
      />

      <EditListingModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        listingToEdit={listingToEdit}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        onConfirmEdit={handleConfirmEdit}
      />

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

export default ViewAllListing;