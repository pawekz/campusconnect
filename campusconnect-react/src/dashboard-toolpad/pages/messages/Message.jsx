import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    setInterval(() => fetchMessages(), 1000);
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

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const message = {
        sender_id: 1, // Replace with actual sender ID
        receiver_id: 2, // Replace with actual receiver ID
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