require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeesRouter = require('./routes/employees');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeesRouter);

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set. Server will run but DB not connected.');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected');
            app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
        })
        .catch((err) => {
            console.error('MongoDB connection error', err);
            app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB connection failed)`));
        });
}

module.exports = app;