const express = require('express');
const Database = require('./config/Database');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'})
app.use(express.json());
app.use(cors());
Database();
const userRoute = require('./Routes/userRoutes');



// console.log(process.env.MONGO_URI);
app.use('/api',userRoute);
// console.log(process.env.PORT);
app.listen(process.env.PORT || 4000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})