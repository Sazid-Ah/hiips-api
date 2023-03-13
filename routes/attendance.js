const express = require("express");
const { body, validationResult } = require("express-validator");
const Attendance = require("../models/Attendance");
const Bookings = require("../models/Booking_service");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
var cron = require('node-cron');
const booking_Service = require("../models/Booking_service");


  
// function booking(){
// var booking_data = booking_Service.find();

// var data =booking_data.Object;
// console.log(data);


// }

  var  object  = booking_Service.findOne();

// // meme.find().toArray((err, memes) => {
// //   console.log("retrieved memes:");
// //   console.log(memes);
// // });
   



  

// cron.schedule('*/redfghj * * * * *', () => {
// console.log(object); 
//    var update= Attendance.create({
//       maid_id:"78547878",
//       maid_emp_id:65878767,
//       mobile_number:"7885487854",
//       maid_name: "bscvj",
//       if_on_leave:"0",
//       alternate_maid_id:"7678897879",
//       alternate_maid_emp_id:"778897",
//       alternate_maid_name:"rita",
//       booking_id:"88898776",
//       flat_id:"87987989",
//       service_date:12/09/2022,
//       is_feedback_submitted:"yes",
//       feedback:"jhghgk",
//       feedback_type:"hjghja",
//       response:"cdds",
//       response_date:12/09/2022,
//     });
   
//     console.log(update);

//   }

// );







// create a user using a post add attendance....
router.post(
  "/add_attendance",
  (body("first_name", "Enter a valid name."),
    body("last_name", "Enter a valid name."),
    body("mobile_number", "Enter number."),
    body("start_time", "Enter  start time.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Attendance.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number:req.body.mobile_number,
      start_time: req.body.start_time,
      booking_id: req.body.booking_id,
      maid_name: req.body.maid_name,
      service_name: req.body.service_name,
      community_name: req.body.community_name,
      block_name: req.body.block_name,
      apartment_name: req.body.apartment_name,
      flat_number: req.body.flat_number,
      pricing: req.body.pricing,
    });

    console.log(community_response);
    res.json({
      status: "success",
      data: community_response,
      message: "Success.",
    });
  }
);
// Edit attendance
router.post("/edit_attendance", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Attendance.findOne({ _id: req.body.id }).count();
  const updatedata = async () => {
    let category = await Attendance.updateMany(
      { _id: ObjectID(req.body.id) },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile_number: req.body.mobile_number,
          start_time: req.body.start_time,
          booking_id: req.body.booking_id,
          maid_name: req.body.maid_name,
          service_name: req.body.service_name,
          community_name: req.body.community_name,
          block_name: req.body.block_name,
          apartment_name: req.body.apartment_name,
          flat_number: req.body.flat_number,
          pricing: req.body.pricing,
        },
      }
    );
    console.log(category);
  };
  updatedata();
  let community = await Attendance.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: community,
    message: "Success.",
  });
});

//   get single apartment by id

router.post("/get_attendance_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Attendance.findOne({ _id: ObjectID(req.body.id) }).count();
  if (user == 0) {
    return res.status(400).json({ error: "This Attendance  does not exists." });
  }
  let user_data = await Attendance.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});
//  get apartments by block by id

// router.post('/get_apartments_by_block_id',(body()),async(req,res)=>{
//   const errors=validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({error:errors.array()});
//   }
//   let user=await Apartment.find({block_id:req.body.block_id});
//   if(user==0){
//     return res.status(400).json({error:"this id does not exist."});
//   }
//   res.json({
//   status:"success",
//   data:user,
//   message:"success"
//   })
// });

//   get  all attendance

router.post("/get_all_attendance", async (req, res) => {
  let community = await Attendance.find().sort({ date: -1 });
  res.json({
    status: "success",
    data: community,
    message: "success",
  });
});

module.exports = router;
