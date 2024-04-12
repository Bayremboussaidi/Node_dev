require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const salleRoutes = require('./routes/salleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/reservations', reservationRoutes);

const port = process.env.PORT || 3001; // Use the PORT environment variable or default to 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
