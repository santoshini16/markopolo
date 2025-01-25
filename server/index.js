const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const chatbotRoutes = require("./routes/chatbotRoutes");
const app = express();
const PORT = 3000;

// CORS setup for allowing requests from your frontend
app.use(cors({
    origin: ['http://localhost:5173',process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
// Body parsing middleware (Express built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB:', error);
    });
    app.use("/api", chatbotRoutes);
    app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});