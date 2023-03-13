const express = require("express");
const { body, validationResult } = require("express-validator");
const SubServices = require("../models/SubServices");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;

// create a user using a post "/api/add_services"
router.post(
  "/add_subservice",
  (body("service_id", "Enter a valid Service Id."),
  body("sub_service_name", "Enter a valid sub service name."),
  body("sub_service_description", "Enter a valid service description."),
  body("sub_service_status", "Enter a valid status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    test = await SubServices.create({
      sub_service_name: req.body.sub_service_name,
      service_id: req.body.service_id,
      sub_service_description:req.body.sub_service_description,
      sub_service_status: req.body.sub_service_status,
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
    "/get_sub_services_by_service_id",
    body(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await SubServices.find({service_id: req.body.service_id });
      console.log(user);
      res.json({
        status: "success",
        data: user,
        message: "Success.",
      });
    }
  );
  
  // edit_   all services

    router.post('/edit_sub_service',
    (body()),
     async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     let user = await SubServices.findOne({ _id: req.body.id }).count();
     const updatedata = async () => {
        await SubServices.updateMany(
         { '_id': ObjectID(req.body.id) }, { $set: { 
            service_id:req.body.service_id,
            sub_service_name:req.body.sub_service_name,
            sub_service_description:req.body.sub_service_description,
            sub_service_status:req.body.sub_service_status,
        }})
     }
     updatedata();
     let update_data = await SubServices.findOne({ _id: req.body.id })
      res.json({
         "status": "success",
         "data": update_data,
         "message": "Success."
     })
 });


router.post("/update_sub_services_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await SubServices.findOne({ _id: ObjectID(req.body.id) }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This Sub Service does not exist." });
  }
  const updatedata = async () => {
    let result = await SubServices.updateMany(
      { _id: ObjectID(req.body.id) },
      { $set: { sub_services_status: req.body.sub_services_status } }
    );
    console.log(result);
  };
  updatedata();
  let user_data = await SubServices.findOne({ _id: ObjectID(req.body.id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

router.post("/get_all_sub_services", async (req, res) => {
  let user = await SubServices.find().sort({user_date:-1});
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

router.post("/get_sub_service_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let service = await SubServices.findOne({ _id: ObjectID(req.body.id) }).count();
  if (service == 0) {
    return res.status(400).json({ error: "This service ID does not exist." });
  }
  let service_data = await SubServices.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: service_data,
    message: "Success.",
  });
});


module.exports = router;