const express=require('express');
const router =express.Router();
// var TextLocalSMS = require('../models/Textlocalsms');
const  sendSms = require('../models/Textlocalsms');



router.post('/demo',async(req,res)=>{
     sendSms()  // called this function for send sms
     res.status(200).json({
         success: true,
         message: "otp sent successfully"
     })



})




// app.get("/demo") => { 
        
//  }


module.exports=router



