import express from 'express';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

export default app;
