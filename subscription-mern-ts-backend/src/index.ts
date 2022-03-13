import express from 'express';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// dv
const app = express();
app.use(cors())
const port = process.env.PORT || 8080;

dotenv.config();

// app.get("/", (req, res) => res.send("hello world"));
app.use(express.json())

// connect to db
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    console.log("DB Connected")
})
.catch((error) => {
    console.log(error)
    throw new Error(error);
})

// routes
app.use("/auth", authRoutes);


// listen
app.listen(port, () => {
    console.log(`Now listening to port ${port}`);
})