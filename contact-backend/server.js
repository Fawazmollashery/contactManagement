const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create an express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Manager API');
});

// Get all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new contact
app.post('/contacts', async (req, res) => {
    const { name, phone, email } = req.body;

    const newContact = new Contact({
        name,
        phone,
        email
    });

    try {
        await newContact.save();
        res.status(201).send(newContact);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
