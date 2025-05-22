const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: ['https://feedback-frontend-zeta.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// In-memory storage
let formEntries = [];

// Routes
app.post('/api/submit', (req, res) => {
  try {
    const { name, email, age, message } = req.body;
    
    // Basic validation
    if (!name || !email || !age || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Add entry to storage with an ID
    const newEntry = {
      id: Date.now().toString(),
      name,
      email,
      age,
      message
    };
    formEntries.push(newEntry);
    
    res.status(201).json({ message: 'Form submitted successfully', data: newEntry });
  } catch (error) {
    console.error('Error in POST /api/submit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/data', (req, res) => {
  try {
    res.json(formEntries);
  } catch (error) {
    console.error('Error in GET /api/data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single entry
app.get('/api/data/:id', (req, res) => {
  try {
    const entry = formEntries.find(entry => entry.id === req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Error in GET /api/data/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update entry
app.put('/api/data/:id', (req, res) => {
  try {
    const { name, email, age, message } = req.body;
    const id = req.params.id;
    
    // Basic validation
    if (!name || !email || !age || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const index = formEntries.findIndex(entry => entry.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Update entry
    formEntries[index] = {
      ...formEntries[index],
      name,
      email,
      age,
      message
    };

    res.json({ message: 'Entry updated successfully', data: formEntries[index] });
  } catch (error) {
    console.error('Error in PUT /api/data/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete entry
app.delete('/api/data/:id', (req, res) => {
  try {
    const id = req.params.id;
    const index = formEntries.findIndex(entry => entry.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Remove entry
    formEntries = formEntries.filter(entry => entry.id !== id);
    
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/data/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 