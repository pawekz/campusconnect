import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Box, Typography, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id;
  }
  return null;
};

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const token = localStorage.getItem('token');
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    fetchUsers();
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      sender_id: currentUserId,
      receiver_id: selectedUser.id,
      content: newMessage
    };

    try {
      await axios.post(
        'http://localhost:8080/message/send',
        messageData,
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
              <TextField
                {...params}
                label="Search Users"
                sx={{
                  '& .MuiInputBase-root': {
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.paper
                  }
                }}
              />
            )}
            sx={{ mb: 2 }}
          />

          {selectedUser && (
            <List sx={{ bgcolor: theme.palette.background.paper }}>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100]
                  }}
                >
                  <ListItemText
                    primary={message.sender_id === currentUserId ? 'You' : selectedUser.name}
                    secondary={new Date(message.sent_at).toLocaleString()}
                    sx={{
                      '& .MuiListItemText-secondary': {
                        color: theme.palette.text.secondary
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

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
              <Typography variant="h6" gutterBottom>
                Chat with {selectedUser.name}
              </Typography>
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
                            : theme.palette.mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                        color: message.sender_id === currentUserId || theme.palette.mode === 'dark'
                            ? theme.palette.common.white
                            : theme.palette.text.primary,
                        borderRadius: '8px',
                        padding: '10px',
                        maxWidth: '70%',
                        wordWrap: 'break-word',  // Add this
                        overflowWrap: 'break-word',  // Add this
                      }}>
                        <ListItemText
                            primary={message.content}
                            primaryTypographyProps={{ // Add this
                              sx: {
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                              }
                            }}
                            secondary={new Date(message.sent_at).toLocaleString()}
                            sx={{
                              '& .MuiListItemText-secondary': {
                                color: message.sender_id === currentUserId || theme.palette.mode === 'dark'
                                    ? theme.palette.common.white
                                    : theme.palette.text.secondary
                              }
                            }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                  <div ref={messagesEndRef} />
                </List>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{
                    '& .MuiInputBase-root': {
                      bgcolor: theme.palette.background.default
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                mt: 4,
                color: theme.palette.text.secondary
              }}
            >
              Select a user to start chatting
            </Typography>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Message;