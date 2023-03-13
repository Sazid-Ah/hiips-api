const express = require("express");
const { body, validationResult } = require("express-validator");
const bookings = require("../models/Bookings");
const bookings_service = require("../models/Booking_service");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;


// create a user using a post "/api/add_bookings_customer"
router.post(
  "/add_booking",(body()),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    booking_data = await bookings.create({
      b_phone_number: req.body.b_phone_number,
      b_amount: req.body.b_amount,
      gst_amount:req.body.gst_amount,
      b_status: req.body.b_status,
      customer_id: req.body.customer_id,
    });
    var booking_id = booking_data._id;
    // console.log(booking_id);
    // function(res, result)

    if(req.body.services){
      for(let x of req.body.services){
        x.booking_id=booking_id;
      }
      var services=  await bookings_service.insertMany(req.body.services);    
   }
    booking_data.services=services;
    res.json({
      status:"success.",
      data: booking_data ,
      services,
      message:"Success.", 
    });
  }
);


//   api for edit data bookings customer
router.post(
  "/edit_booking",
  body(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let booking = await bookings.findOne({ _id: ObjectID(req.body.id)});
    if(booking){
      var booking_id = booking._id;
      const updatedata = async () => {
        await bookings.updateMany({ _id: ObjectID(booking_id) },
          {
            $set: {
              b_phone_number: req.body.b_phone_number,
              b_amount: req.body.b_amount,
              gst_amount:req.body.gst_amount,
              b_status: req.body.b_status,
              customer_id: req.body.customer_id,
            },
          }
        );
      };
      updatedata();
      console.log(booking_id);
      let booked_services = req.body.services;
      for(let x of booked_services){
        //x.booking_id=booking_id;
        var update = await bookings_service.updateMany(
             {booking_id:booking_id,service_id:x.service_id},
             {$set:{
            service_name:x.service_name,
            service_duration_id:x.service_duration_id,
            service_duration_title:x.service_duration_title,
            price:x.price,
            total_price:x.total_price,
            start_date:x.start_date,
            preferred_time:x.preferred_time,
            flat_type_id:x.flat_type_id,
            flat_type_name:x.flat_type_name,
            block_id:x.block_id,
            block_name:x.block_name,
            apartment_id:x.apartment_id,
            apartment_name:x.apartment_name,
            flat_number:x.flat_number,
            first_name:x.first_name,
            last_name:x.last_name,
            email:x.email,
            mobile_number:x.mobile_number,
            maid_id:x.maid_id,
            maid_name:x.maid_name,
            booking_services_status:x.booking_services_status,
          }
          }
        );
        console.log(update);
      }
      var booking_id = booking._id;
      console.log(booking_id);
      let update_data = await bookings.findOne({ _id: ObjectID(req.body.id)});
      let data= await bookings_service.find({booking_id:booking_id});
       
      res.json({
        status: "success",
        data: update_data,
        services_data:data,
        message: "Success.",
      });
    } else {
      res.json({
        status: "fail",
        data: '',
        message: "Booking not found.",
      });
    }
  }

);

router.post("/update_booking_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await bookings.findOne({
    _id: ObjectID(req.body.id),
  }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This facilitator does not exists." });
  }
  const updatedata = async () => {
    let result = await bookings.updateMany(
      { _id: ObjectID(req.body.b_c_id) },
      { $set: { b_c_status: req.body.b_c_new_status } }
    );
    console.log(result);
  };
  updatedata();

  let user_data = await bookings.findOne({ _id: ObjectID(req.body.id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});


// api for get all data bookings customer
router.post("/get_all_bookings", async (req, res) => {
  let bookings_services = await bookings_service.find().sort({ user_date: -1 });
  let booking = await bookings.find().sort({ user_date: -1 });
  res.json({
    status: "success",
    data:booking,bookings_services,
    message: "Success.",
  });
});




router.post(
  "/get_bookings_by_customer_phone_number",
  body(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let bookings_data = await bookings.find({b_phone_number:req.body.phone_number});
    var service_data = [];
      for(let booking of bookings_data){
          let all_service_data = await bookings_service.find({booking_id:booking._id})
          service_data.push( {"booking_data": booking, "services": all_service_data}); 
      }
    res.json({
      status: "success",
      data: service_data,
      message: "Success.",
    });
  }
);


router.post("/get_bookings_by_booking_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let booking = await bookings.find({ _id: ObjectID(req.body.id) });
  if (booking == 0) {
    return res.status(400).json({ error: "This booking does not exists." });
  }
  let booking_services = await bookings_service.find({booking_id:req.body.id});
  if (booking_services == 0) {
    return res.status(400).json({ error: "This booking does not exists." });
  }
  // let booking_data = await bookings.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: booking,booking_services,
    message: "Success.",
  });
});


module.exports = router;
