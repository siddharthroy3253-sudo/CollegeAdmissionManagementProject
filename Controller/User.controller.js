
const UserDetails = require('../backend/User')


const DisplayAllData = async (req, res) => {
    const Data = await UserDetails.find();
    res.render('Homes', { Data });
}


const showDataform = (req, res) => {
    res.render('show-contact');
}

const showSingledata = async (req, res) => {
    const showDetails = await UserDetails.findOne({ _id: req.params.id });
    res.render('show-contact', { showDetails });
}



const updateData = async (req, res) => {
    const EditData = await UserDetails.findById(req.params.id);
    res.render('update-contact', { EditData });
}


const SaveUPdateData = async (req, res) => {
    await UserDetails.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
}

const Userform = (req, res) => {
    res.render('Add-contact');
}


 


const Adddatasave = async (req, res) => {
    try {
        const { first_name, last_name, father_name, phone, email, Address } = req.body;

        // Check if email already exists
        const existingUser = await UserDetails.findOne({ email });
        const Exitphoneno = await UserDetails.findOne({ phone });

        if (Exitphoneno) {
            return res.status(400).send("Phone no Exists ,Enter Unique Number");
        }

        if (existingUser) {
            return res.status(400).send('Email already exists. Please use a different one.');
        }

        const UserData = new UserDetails({ first_name, last_name, father_name, phone,  email, Address });
        await UserData.save();

        res.redirect('/');
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send('Server error. Data was not stored.');
    }
}

const deleteData = async (req, res) => {
    await UserDetails.findByIdAndDelete(req.params.id);
    res.redirect('/');
}


module.exports = {
    DisplayAllData,
    showSingledata,
    updateData,
    SaveUPdateData,
    Userform,
    showDataform,
    deleteData,
    Adddatasave
}