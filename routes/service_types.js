const express = require("express");
const { body, validationResult } = require("express-validator");
const Service_types = require("../models/Service_types");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post "/api/add_services_type"
router.post(
  "/add_service_type",
  (body("service_type_name", "Enter a valid service name."),
  body("service_type_description", "Enter a description."),
  body("service_type_status", "Enter a valid status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    test = await Service_types.create({
      category_id: req.body.category_id,
      service_type_name: req.body.service_type_name,
      service_type_description: req.body.service_type_description,
      service_type_status: req.body.service_type_status,

    });
    res.json({
      status: "success", 
      data: test,
      message: "Success.",
    });
  }
);

// Get all types by category ID
router.post("/get_service_type_by_category_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Service_types.find({ category_id: req.body.category_id });
  console.log(user);
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

// Update service type
router.post("/edit_service_type", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await Service_types.findOne({ _id: req.body.id }).count();
  const updatedata = async () => {
    await Service_types.updateMany(
      { _id: ObjectID(req.body.id) },
      {
        $set: {
          category_id: req.body.category_id,
          service_type_name: req.body.service_type_name,
          service_type_description: req.body.service_type_description,
          service_type_status: req.body.service_type_status,
        },
      }
    );
  };
  updatedata();
  let update_data = await Service_types.findOne({ _id: req.body.id });
  res.json({
    status: "success",
    data: req.body,
    message: "Success.",
  });
});


// Update service type status
router.post("/update_service_type_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Service_types.findOne({ _id: ObjectID(req.body.id) }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This Service Type does not exist." });
  }
  const updatedata = async () => {
    let result = await Service_types.updateMany(
      { _id: ObjectID(req.body.id) },
      { $set: { service_type_status: req.body.service_type_status } }
    );
    console.log(result);
  };
  updatedata();
  let user_data = await Service_types.findOne({ _id: ObjectID(req.body.id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

// Get all service types
router.post("/get_all_service_type", async (req, res) => {
  let user = await Service_types.find().sort({user_date:-1});
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});


// Get service type by Id
router.post("/get_service_type_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let service = await Service_types.findOne({ _id: ObjectID(req.body.id) }).count();
  if (service == 0) {
    return res.status(400).json({ error: "This Service Type does not exist." });
  }
  let service_data = await Service_types.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: service_data,
    message: "Success.",
  });
});

module.exports = router;
