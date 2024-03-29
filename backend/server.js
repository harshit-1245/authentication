const express=require('express');
const connectDB = require( './config/db' );
const colors=require('colors')
const userRouter=require('./router/useRoutes')
const cors=require('cors')
const cookieParser=require("cookie-parser")
const app=express();
require('dotenv').config();

const port=process.env.PORT || 5000;

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser())
app.use('/user',userRouter)


app.listen(port,()=>{
    console.log(`Server live at ${port}`.yellow.bold)
})


