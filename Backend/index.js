require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeesRouter = require('./routes/employees');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Backend is running' });
});
app.use('/api/employees', employeesRouter);

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.error('MongoDB connection error', err);
        });
}

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;