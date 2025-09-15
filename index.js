

const express=require('express');
const mongoose=require('mongoose');
const  path=require('path');
const UserDetails = require('./backend/User');
const app=new express();



// middleware

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));


//connectino with mangodb  

mongoose.connect('mongodb://127.0.0.1:27017/Siddharth',{
    useNewUrlParser: true,
  useUnifiedTopology: true


}).then(()=>{
    console.log("mongodb connectedcr successfully");
}).catch(err=>{
    console.log("server error ")
})

  

app.use(express.urlencoded({extended:true}))



//routing


 

app.get('/', async(req,res)=>{
      
   const  Data= await  UserDetails.find()
    // res.json(contact )
    res.render('homes',{Data}); 
})
  


app.get('/Add-contact',(req,res)=>{
    res.render('Add-contact');
})

 app.post('/Add-contact', async (req, res) => {
  try {
    const { first_name, last_name, father_name,phone, email, Address } = req.body;

    // Check if email already exists

    const existingUser = await UserDetails.findOne({ email });
    const Exitphoneno=await UserDetails.findOne({phone});

    if(Exitphoneno){
       res.status(400).send("Phone no Exists ,Enter Unique Number")
    }

    if (existingUser) {
      return res.status(400).send('Email already exists. Please use a different one.');
    }

    const UserData = new UserDetails({ first_name, last_name, father_name,phone, email, Address });
    await UserData.save();

    res.redirect('/');
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).send('Server error. Data was not stored.');
  }
});



app.get('/show-contact/:id', async(req,res)=>{
     
    const  showDetails=await UserDetails.findOne({_id:req.params.id});
    res.render('show-contact',{showDetails})
})


app.get('/show-contact',(req,res)=>{
    res.render('show-contact')
})



app.get('/update-contact/:id', async(req,res)=>{
    const EditData=await UserDetails.findById(req.params.id);
    
    res.render('update-contact',{EditData});
})


app.post('/update-contact/:id', async(req,res)=>{
await UserDetails.findByIdAndUpdate(req.params.id,req.body)
res.redirect('/')
})

 

app.get('/Delete-contact/:id',async(req,res)=>{
   await UserDetails.findByIdAndDelete(req.params.id)
   res.redirect('/') 
})



// app.get('/Delete-contact/:id', async (req, res) => {
//   try {
//     await UserDetails.findByIdAndDelete(req.params.id);
//     res.redirect('/');
//   } catch (err) {
//     console.error('Error deleting contact:', err);
//     res.status(500).send('Server error');
//   }
// });


// app.delete('/Delete-contact/:id', async (req, res) => {
//   try {
//     await UserDetails.findByIdAndDelete(req.params.id);
//     res.send('Contact deleted');
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });



 
app.listen(3000,(req,res)=>{
    console.log("server connected sucessfully");
})