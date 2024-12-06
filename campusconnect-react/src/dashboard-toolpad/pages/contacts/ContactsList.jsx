import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';

const ContactsList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <Box sx={{ width: '25%', borderRight: '1px solid #ccc', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Contacts</Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem button key={contact.id} onClick={() => onSelectContact(contact)}>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactsList;