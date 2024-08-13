import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors'

//configure env
dotenv.config();

//connect to database 
connectDB();

//rest objects
const app =express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoute);

app.use('/api/v1/product', productRoutes);

app.use('/api/v1/category',categoryRoutes);


//rest api
app.get('/', (req,res) => {
    res.send({
        message: "Hi!!! WElCOME TO OUR ECOMMERCE APP"
    })
})
//PORT
const PORT = process.env.PORT || 8080;
//by chance agar process/env file mai koi dikkat ho toh by default port 8080 use kro


//run or listen to the port
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgBlue.white)
})