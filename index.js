 

 
const express = require('express');
const path = require('path');
 const connectDb=require('./config/Database')
const UserDetails = require('./backend/User'); 
const Userrouter=require('./Router/user.router')

const app = express();
 
 
// middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
//connect to MongoDB  
 connectDb() 

 

//routing
app.use(Userrouter)

   
 
const port=process.env.port|3000
app.listen(port, () => {
    console.log("server connected");
});

  