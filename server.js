const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let messages = []; // In-memory storage

// Route to receive messages
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  const newMessage = {
    name,
    email,
    message,
    created_at: new Date().toISOString()
  };

  messages.push(newMessage);
  console.log('New message received:', newMessage);

  res.send('Message received!');
});

// Route to get all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
