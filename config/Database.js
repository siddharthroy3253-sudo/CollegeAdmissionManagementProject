

const mongoose = require('mongoose');
require('dotenv').config()
const connectDb=()=>{

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongodb connected successfully");
}).catch(err => {
    console.log("server error ", err);
});


}

module.exports=connectDb