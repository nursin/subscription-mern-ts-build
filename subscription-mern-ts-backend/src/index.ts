import express from 'express';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dv
const app = express();
const port = process.env.PORT || 8080;

dotenv.config({ path: '/.env' });

// app.get("/", (req, res) => res.send("hello world"));
app.use(express.json())

// connect to db
const connection_url = 'mongodb+srv://admin:PynyxaoF1bhfT45k@cluster0.gw1qf.mongodb.net/tinderdb?retryWrites=true&w=majority';
mongoose.connect(connection_url as string)
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