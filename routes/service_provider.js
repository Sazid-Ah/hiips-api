const express = require("express");
const { body, validationResult } = require("express-validator");
const Service = require("../models/Service_provider");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
const path = require("path");
const multer = require("multer");

var filename;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads/images");
  },
  filename: (req, file, cb) => {
    filename = Date.now() + path.extname(file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});

// create a user using a post "/api/auth"
router.post(
  "/add_service_provider",
  upload.single("maid_image"),
  (body("name", "Enter a valid name."),
  body("age", "Enter your age."),
  body("experience", "Enter your work experience."),
  body("employee_id", "Enter your employee id."),
  body("blood_group", "Enter your blood group."),
  body("covid_vaccination", "Enter your covid vaccination."),
  body("esi_number", "Enter your esi number."),
  body("pf_number", "Enter your pf number."),
  body("emergency_contact_number", "Enter your emergency contact number."),
  body("nearst_police_station", "Enter your nearst police station."),
  body("gender", "Enter your gender."),
  body("designation", "Enter your designation."),
  body("pan_card_number", "Enter your pan card number."),
  body("is_police_verified"),
  body("refrence_1_type_name", "Enter refrence type name."),
  body("refrence_1_type_number", "Enter refrence type number"),
  body("refrence_2_type_name", "Enter refrence type name."),
  body("refrence_2_type_number", "Enter refrence type number."),
  body("father_spouse_name", "Enter  father/spoush name."),
  body("father_spouse_age", ".Enter father/spoush age."),
  body("father_spouse_number", "Number must be atleast 10 characters"),
  body("father_spouse_address", "Number must be atleast 10 characters"),
  body("father_spouse_image", "Number must be atleast 10 characters"),
  body("father_spouse_adhar_number", "Number must be atleast 10 characters"),
  body(
    "father_spouse_bank_account_details",
    "Number must be atleast 10 characters"
  )),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // let user = await Service.findOne({ a_mobile_number: req.body.a_mobile_number }).count();

    // if (user > 0) {
    //     return res.status(400).json({ error: "This mobile number already exists." })
    // }
    customer_response = await Service.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      email_id: req.body.email_id,
      skillset: req.body.skillset,
      blood_group: req.body.blood_group,
      experience: req.body.experience,
      maid_image: "/static/uploads/images/" + filename,
      date_of_joining: req.body.date_of_joining,
      date_of_exit: req.body.date_of_exit,
      date_of_birth: req.body.date_of_birth,
      education: req.body.education,
      active: req.body.active,
      covid_vaccination: req.body.covid_vaccination,
      esi_number: req.body.esi_number,
      pf_number: req.body.pf_number,
      emergency_contact_number: req.body.emergency_contact_number,
      alternative_phone_number: req.body.alternative_phone_number,
      nearst_police_station: req.body.nearst_police_station,
      designation: req.body.designation,
      pan_card_number: req.body.pan_card_number,
      employee_id: req.body.employee_id,
      is_police_verified: req.body.is_police_verified,
      adhar_number: req.body.adhar_number,
      phone_number: req.body.phone_number,
      father_spouse_name: req.body.father_spouse_name,
      father_spouse_number: req.body.father_spouse_number,
      reference_1_type_name: req.body.reference_1_type_name,
      reference_1_type_number: req.body.reference_1_type_number,
      reference_2_type_name: req.body.reference_2_type_name,
      reference_2_type_number: req.body.reference_2_type_number,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      landmark: req.body.landmark,
      city: req.body.city,
      zip_or_postal_code: req.body.zip_or_postal_code,
      state: req.body.state,
      account_number: req.body.account_number,
      bank_name: req.body.bank_name,
      account_holder_name: req.body.account_holder_name,
      ifsc_code: req.body.ifsc_code,
      branch: req.body.branch,
      covid_vaccination_1: req.body.covid_vaccination_1,
      covid_vaccination_2: req.body.covid_vaccination_2,
      covid_vaccination_booster: req.body.covid_vaccination_booster,
    });
    console.log(customer_response);
    res.json({
      status: "success",
      data: customer_response,
      message: "Success.",
    });
  }
);
router.post(
  "/edit_service_provider",
  upload.single("maid_image"),
  body("a_mobile_number", "Number must be atleast 10 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Service.findOne({ _id: ObjectID(req.body.id) }).count();
    console.log(user);
    if (user == 0) {
      return res.status(400).json({ error: "This id not exists." });
    }
    if (req.body.maid_image) {
      const updatedata = async () => {
        let result = await Service.updateMany(
          { _id: ObjectID(req.body.id) },
          {
            $set: {
              name: req.body.name,
              age: req.body.age,
              gender: req.body.gender,
              email_id: req.body.email_id,
              skillset: req.body.skillset,
              blood_group: req.body.blood_group,
              experience: req.body.experience,
              maid_image: "/static/uploads/images/" + filename,
              date_of_joining: req.body.date_of_joining,
              date_of_exit: req.body.date_of_exit,
              date_of_birth: req.body.date_of_birth,
              education: req.body.education,
              active: req.body.active,
              covid_vaccination: req.body.covid_vaccination,
              esi_number: req.body.esi_number,
              pf_number: req.body.pf_number,
              emergency_contact_number: req.body.emergency_contact_number,
              alternative_phone_number: req.body.alternative_phone_number,
              nearst_police_station: req.body.nearst_police_station,
              designation: req.body.designation,
              pan_card_number: req.body.pan_card_number,
              employee_id: req.body.employee_id,
              is_police_verified: req.body.is_police_verified,
              adhar_number: req.body.adhar_number,
              phone_number: req.body.phone_number,
              father_spouse_name: req.body.father_spouse_name,
              father_spouse_number: req.body.father_spouse_number,
              reference_1_type_name: req.body.reference_1_type_name,
              reference_1_type_number: req.body.reference_1_type_number,
              reference_2_type_name: req.body.reference_2_type_name,
              reference_2_type_number: req.body.reference_2_type_number,
              address_line_1: req.body.address_line_1,
              address_line_2: req.body.address_line_2,
              landmark: req.body.landmark,
              city: req.body.city,
              zip_or_postal_code: req.body.zip_or_postal_code,
              state: req.body.state,
              account_number: req.body.account_number,
              bank_name: req.body.bank_name,
              account_holder_name: req.body.account_holder_name,
              ifsc_code: req.body.ifsc_code,
              branch: req.body.branch,
              covid_vaccination_1: req.body.covid_vaccination_1,
              covid_vaccination_2: req.body.covid_vaccination_2,
              covid_vaccination_booster: req.body.covid_vaccination_booster,
            },
          }
        );
      };
      console.log(result);
    }
    let data = await Service.findOne({ _id: ObjectID(req.body.id) });
    console.log(req.body);
    res.json({
      status: "success",
      data: data,
      message: "Success.",
    });
  }
);

router.post("/update_service_provider_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Service.findOne({ a_id: ObjectID(req.body.a_id) }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This facilitator does not exists." });
  }
  const updatedata = async () => {
    let result = await Service.updateMany(
      { _id: ObjectID(req.body.a_id) },
      { $set: { a_status: req.body.a_new_status } }
    );
    console.log(result);
  };
  updatedata();

  let user_data = await Service.findOne({ a_id: ObjectID(req.body.a_id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

//get_all_service_provider

router.post("/get_all_service_provider", async (req, res) => {
  let user = await Service.find().sort({ user_date: -1 });
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

//get_service_provider_by_id

router.post("/get_service_provider_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let sp = await Service.findOne({ _id: ObjectID(req.body.id) }).count();

  if (sp == 0) {
    return res.status(400).json({ error: "This categoty does not exists." });
  }
  let sp_data = await Service.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: sp_data,
    message: "Success.",
  });
});

module.exports = router;
