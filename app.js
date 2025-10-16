const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const authRoutes = require("./routes/authRoutes");
const cors = require("cors")

const app = express();
dotenv.config()



// Middleware to read JSON body
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // allow frontend requests
app.use(bodyParser.urlencoded({ extended: true })); 


const port = process.env.PORT || 5000;


const connectdb = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log( "Db connected")
} catch (error) {
    console.log("Db is not  connected")
}}


app.use('/api', authRoutes);

app.listen(5000,()=>{
    connectdb()  // Connect to MongoDB
    console.log(`server is running at ${port}`)
})

