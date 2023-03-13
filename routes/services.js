const express = require("express");
const { body, validationResult } = require("express-validator");
const Services = require("../models/Services");
const test = require("../models/Booking_service");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;

// create a user using a post "/api/add_services"
router.post(
  "/add_service",
  (body("service_type_id", "Enter a valid Service Type Id."),
  body("service_name", "Enter a valid service name."),
  body("service_description", "Enter a valid service name."),
  body("service_status", "Enter a valid status."),
  body("service_is_itself", "Enter a valid status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    test = await Services.create({
      service_name: req.body.service_name,
      service_type_id: req.body.service_type_id,
      service_description:req.body.service_description,
      service_status: req.body.service_status,
      service_is_itself: req.body.service_is_itself,
    });
    res.json({
      status: "success",
      data: test,
      message: "Success.",
    });
  }
);

// get_services_by_ service type ID
router.post(
    "/get_services_by_service_type_id",
    body(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Services.find({service_type_id: req.body.service_type_id });
      console.log(user);
      res.json({
        status: "success",
        data: user,
        message: "Success.",
      });
    }
  );
  
  // edit_   all services
    router.post('/edit_services',
    (body()),
     async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     let user = await Services.findOne({ _id: req.body.id }).count();
     const updatedata = async () => {
        await Services.updateMany(
         { '_id': ObjectID(req.body.id) }, { $set: { 
          service_type_id:req.body.service_type_id,
          service_name:req.body.service_name,
          service_description:req.body.service_description,
          service_status:req.body.service_status,
          service_is_itself:req.body.service_is_itself,
        }})
     }
     updatedata();
     let update_data = await Services.findOne({ _id: req.body.id })
      res.json({
         "status": "success",
         "data": update_data,
         "message": "Success."
     })
 });


router.post("/update_services_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Services.findOne({ _id: ObjectID(req.body.id) }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This Services does not exists." });
  }
  const updatedata = async () => {
    let result = await Services.updateMany(
      { _id: ObjectID(req.body.id) },
      { $set: { services_status: req.body.services_status } }
    );
    console.log(result);
  };
  updatedata();
  let user_data = await Services.findOne({ _id: ObjectID(req.body.id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

router.post("/get_all_services", async (req, res) => {
  let user = await Services.aggregate([{$match:{"service_status":"1"}},
  {$lookup:{from:"categories",localField:"category_name",foreignField:"service_statusg",as:"all_data"}}
]).sort({user_date:-1});
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

router.post("/get_service_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let service = await Services.findOne({ _id: ObjectID(req.body.id) }).count();
  if (service == 0) {
    return res.status(400).json({ error: "This service ID does not exist." });
  }
  let service_data = await Services.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: service_data,
    message: "Success.",
  });
});


module.exports = router;
