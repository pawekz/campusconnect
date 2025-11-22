import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Typography,
    ListItem,
    ListItemText,
    List
} from '@mui/material';
import axios from 'axios';
import SendIcon from '../../../assets/sendIcon.json?url';
import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";
import { useTheme } from '@mui/material/styles';

defineElement(lottie.animation);

const MessageModal = ({ open, onClose, listing, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const theme = useTheme();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (listing?.user?.id) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [listing]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/message/history?userId1=${currentUserId}&userId2=${listing.user.id}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            await axios.post(
                'http://localhost:8080/message/send',
                {
                    sender_id: currentUserId,
                    receiver_id: listing.user.id,
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

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Message Seller</DialogTitle>
            <DialogContent>
                {/* Product Listing Card */}
                <ListItem
                    sx={{
                        border: 1,
                        borderColor: 'grey.300',
                        borderRadius: 2,
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: 1
                    }}
                >
                    <ListItemText
                        primary={listing?.product_title}
                        secondary={`₱${listing?.price}`}
                    />
                    <Box
                        component="img"
                        src={`http://localhost:5173${listing?.image}`}
                        alt={listing?.product_title}
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            objectFit: 'cover',
                            ml: 2
                        }}
                    />
                </ListItem>

                {/* Messages Section */}
                <Box sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
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
                                        color: message.sender_id === currentUserId
                                            ? '#ffffff'
                                            : theme.palette.text.primary,
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
                        <lord-icon
                            trigger="hover"
                            src={SendIcon}
                            style={{width: '40px', height: '40px', cursor: 'pointer'}}
                            onClick={handleSendMessage}
                        />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default MessageModal;
