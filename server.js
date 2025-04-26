const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Store data in memory (optional: later we can persist in a file)
let storedData = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to collect data from cross-browser extension
app.post('/collect', (req, res) => {
  const incomingData = req.body;
  storedData.push(incomingData);
  
  // Optional: Save to file every time
  fs.writeFileSync('collectedData.json', JSON.stringify(storedData, null, 2));

  console.log('Data collected:', incomingData.url);
  res.status(200).json({ message: 'Data received successfully' });
});

// Route for Chrome extension to fetch all collected data
app.get('/data', (req, res) => {
  res.status(200).json(storedData);
});

// Route to clear stored data (optional)
app.post('/clear', (req, res) => {
  storedData = [];
  fs.writeFileSync('collectedData.json', JSON.stringify([], null, 2));
  res.status(200).json({ message: 'All data cleared' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});