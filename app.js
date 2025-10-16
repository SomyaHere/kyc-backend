const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
const port = process.env.PORT || 5001;

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit process if DB connection fails
  }
};

// Mount routes
app.use('/api', authRoutes);

// Start server only after DB is connected
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(` Server running at http://localhost:${port}`);
  });
};

startServer();
