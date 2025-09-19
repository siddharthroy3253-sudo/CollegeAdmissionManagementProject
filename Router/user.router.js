
const express = require('express');
const router=express.Router()

const userController=require('../Controller/User.controller')


router.get('/',userController.DisplayAllData);

router.get('/Add-contact',userController.Userform);

router.post('/Add-contact',userController.Adddatasave);

router.get('/show-contact/:id', userController.showSingledata);

router.get('/show-contact', userController.showDataform);

router.get('/update-contact/:id',userController.updateData);

router.post('/update-contact/:id',userController.SaveUPdateData );

router.get('/Delete-contact/:id', userController.deleteData);



module.exports=router
