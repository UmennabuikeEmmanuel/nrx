const express = require('express');
const app = express();
const port = 3000;
app.use(express.json({ limit: '10gb' })); // Increase the limit to handle larger payloads
app.use(express.urlencoded({ extended: true, limit: '10gb' })); // Increase the limit to handle larger payloads
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
let storedData = {
    cookies: [],
    localStorage: {},
    sessionStorage: {},
};

app.post('/upload', (req, res) => {
    storedData = req.body;
    console.log('Stored data:', JSON.stringify(storedData, null, 2));
    res.status(200).send('Data received and stored successfully!');
});

app.get('/data', (req, res) => {
    res.json(storedData);
});

app.listen(port, () => {    
    console.log(`Server is running at http://localhost:${port}`);
});
