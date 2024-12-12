import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Box, Typography, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const POLLING_INTERVAL = 60000; // 1 minute polling rate

const Message = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/message/getmessagerecords');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8080/user/getuserrecords', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const message = {
        sender_id: 1, // Replace with actual sender ID
        receiver_id: selectedUser?.id || 2, // Use selected user's ID if available
        content: newMessage,
        sent_at: new Date().toISOString()
      };
      await axios.post('http://localhost:8080/message/postmessagerecord', message);
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <Box className="message-container" sx={{ padding: 2, maxHeight: '80vh', overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>Chat</Typography>
        <Autocomplete
          options={users}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(event, newValue) => setSelectedUser(newValue)}
          filterOptions={(options, { inputValue }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(option =>
              `${option.firstName} ${option.lastName}`.toLowerCase().includes(searchTerm)
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Users"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ display: 'flex', justifyContent: message.sender_id === 1 ? 'flex-end' : 'flex-start' }}>
              <Box sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#001f3f' : '#f0f0f0',
                borderRadius: '8px',
                padding: '10px',
                maxWidth: '60%'
              }}>
                <ListItemText primary={message.content} secondary={`Sent at: ${message.sent_at}`} />
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ display: 'flex', marginTop: 2 }}>
          <TextField
            label="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};
export default Message;