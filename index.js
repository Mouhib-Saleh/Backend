const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true },
() => console.log('connected to db'));


const authRoute = require('./routes/auth');



app.use(express.json());



app.use('/api/user',authRoute);



app.listen(3000,()=>console.log('server running'));
