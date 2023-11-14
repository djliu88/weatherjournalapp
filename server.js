const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Data endpoint
let projectData = {};

// Routes
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.send(projectData);
});

// Setup Server
app.listen(port, () => {
    console.log('Server is running');
    console.log(`Running on localhost:${port}`);
});
