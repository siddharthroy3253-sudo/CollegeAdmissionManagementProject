  
 
  const mongoose=require('mongoose') 

 const UserSchema= new mongoose.Schema({
     first_name:{type:String,require:true},
     last_name:{type:String,require:true},
     father_name:{type:String,require:true},
     phone:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    Address:{type:String,require:true}
     
 })

  const UserDetails=mongoose.model('UserDetails',UserSchema)
  module.exports=UserDetails;
