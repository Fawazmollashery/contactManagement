import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Fetch contacts from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/contacts') // Adjust URL to match your backend
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  // Handle adding a new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    const newContact = { name, phone, email };

    fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]); // Add the new contact to the list
        setName('');
        setPhone('');
        setEmail('');
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  // Handle deleting a contact by ID
  const handleDeleteContact = (id) => {
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setContacts(contacts.filter((contact) => contact._id !== id)); // Remove the deleted contact
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  return (
    <Container maxWidth="sm" className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Manager
      </Typography>

      {/* Contact Form */}
      <form onSubmit={handleAddContact}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Contact
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Contact List */}
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '30px' }}>
        Contact List
      </Typography>
      <Grid container spacing={2}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Grid item xs={12} key={contact._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{contact.name}</Typography>
                  <Typography variant="body1">{contact.phone}</Typography>
                  <Typography variant="body1">{contact.email}</Typography>
                  <IconButton aria-label="delete" onClick={() => handleDeleteContact(contact._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No contacts added yet.</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default App;
