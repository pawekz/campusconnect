import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import {
  TextField, Button, List, ListItem, ListItemText, Box, Typography,
  Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Token helper function
const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id;
  }
  return null;
};

const Message = () => {
  // State declarations
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const token = localStorage.getItem('token');
  const currentUserId = getCurrentUserId();

  // Data fetching effects
  useEffect(() => {
    fetchUsers();
    if (selectedUser) {
      fetchMessages();
      fetchUserListings();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  // API calls
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.get(
          `http://localhost:8080/message/history?userId1=${currentUserId}&userId2=${selectedUser.id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUserListings = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.get('http://localhost:8080/API/productlisting/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const filteredListings = response.data.filter(listing =>
          listing.user?.id === selectedUser.id
      );
      setUserListings(filteredListings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  // Event handlers
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    try {
      await axios.post(
          'http://localhost:8080/message/send',
          {
            sender_id: currentUserId,
            receiver_id: selectedUser.id,
            content: newMessage
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
      );
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setOpenDetailDialog(true);
  };

  const handleAcceptListing = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmAccept = async () => {
    try {
      const transactionData = {
        userId: currentUserId,
        productListingId: selectedListing.id,
        transactionDetails: `Purchase of ${selectedListing.product_title} for ₱${selectedListing.price}`
      };

      console.table({
        'Buyer ID': currentUserId,
        'Product ID': selectedListing.id,
        'Product Title': selectedListing.product_title,
        'Price': selectedListing.price
      });

      const response = await axios.post(
          'http://localhost:8080/API/transactions/create',  // Updated endpoint
          transactionData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
      );

      console.table(response.data);  // Log the created transaction

      setOpenConfirmDialog(false);
      setOpenDetailDialog(false);
      setSelectedListing(null);
      await fetchUserListings(); //await is pause execution until a promise is resolved
    } catch (error) {
      console.error('Transaction creation error:', error);
    }
  };

  // Main render
  return (
      <PageContainer>
        <Box sx={{
          display: 'flex',
          height: '80vh',
          gap: 2,
          p: 2,
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}>
          {/* Left Panel - Users and Listings */}
          <Box sx={{
            width: '30%',
            borderRight: 1,
            borderColor: theme.palette.divider,
            bgcolor: theme.palette.background.paper,
            borderRadius: 1,
            p: 2
          }}>
            <Typography variant="h6" gutterBottom>Users</Typography>
            <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                onChange={(_, newValue) => setSelectedUser(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Search Users" />
                )}
                sx={{ mb: 2 }}
            />

            {/* User Listings */}
            {selectedUser && userListings.length > 0 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {selectedUser.name}'s Listings
                  </Typography>
                  <List sx={{
                    maxHeight: '360px',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '4px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '4px',
                      '&:hover': {
                        background: '#555'
                      }
                    }
                  }}>
                    {userListings.map((listing) => (
                      <ListItem
                        key={listing.id}
                        onClick={() => handleListingClick(listing)}
                        sx={{
                          border: 1,
                          borderColor: 'grey.300',
                          borderRadius: 2,
                          mb: 1,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          boxShadow: 1,
                          '&:hover': {
                            bgcolor: theme.palette.action.hover,
                            transform: 'translateX(4px)',
                            transition: 'transform 0.2s ease-in-out'
                          }
                        }}
                      >
                        <ListItemText
                            primary={listing.product_title}
                            secondary={`₱${listing.price}`}
                            sx={{
                              '& .MuiListItemText-primary': {
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }
                            }}
                        />
                        <Box
                          component="img"
                          src={`http://localhost:5173${listing.image}`}
                          alt={listing.product_title}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            objectFit: 'cover',
                            ml: 2
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
          </Box>

          {/* Right Panel - Chat Area */}
          <Box sx={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.paper,
            borderRadius: 1,
            p: 2
          }}>
            {selectedUser ? (
                <>
                  <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                    <List>
                      {messages.map((message) => (
                          <ListItem
                              key={message.id}
                              sx={{
                                display: 'flex',
                                justifyContent: message.sender_id === currentUserId ? 'flex-end' : 'flex-start'
                              }}
                          >
                            <Box sx={{
                              backgroundColor: message.sender_id === currentUserId
                                  ? theme.palette.primary.main
                                  : theme.palette.grey[200],
                              borderRadius: '8px',
                              padding: '10px',
                              maxWidth: '70%'
                            }}>
                              <ListItemText
                                  primary={message.content}
                                  secondary={new Date(message.sent_at).toLocaleString()}
                              />
                            </Box>
                          </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button variant="contained" onClick={handleSendMessage}>
                      Send
                    </Button>
                  </Box>
                </>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                  Select a user to start chatting
                </Typography>
            )}
          </Box>
        </Box>

        {/* Listing Detail Dialog */}
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
                  <Button
                      onClick={handleAcceptListing}
                      variant="contained"
                      color="success"
                  >
                    Accept Listing
                  </Button>
                  <Button onClick={() => setOpenDetailDialog(false)}>
                    Close
                  </Button>
                </DialogActions>
              </>
          )}
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
            open={openConfirmDialog}
            onClose={() => setOpenConfirmDialog(false)}
        >
          <DialogTitle>Confirm Acceptance</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to accept this listing?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmAccept} variant="contained" color="success">
              Yes, Accept
            </Button>
            <Button onClick={() => setOpenConfirmDialog(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </PageContainer>
  );
};

export default Message;