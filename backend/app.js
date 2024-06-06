const express = require("express");
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
    console.error('PORT environment variable is not defined');
    process.exit(1); // Exit the process with an error code
}

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['POST', 'GET'],
    credentials: true,
}));

// Routes
readdirSync('./routes').forEach(route => {
    app.use('/api/v1', require(`./routes/${route}`));
});

// Test route
app.get('/', (req, res) => {
    res.send("Hello world");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const startServer = async () => {
    try {
        await db(); // Ensure the database connection is established before starting the server
        app.listen(PORT, () => {
            console.log('Listening to port:', PORT);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();









