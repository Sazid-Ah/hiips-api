const express = require('express');
const { body, validationResult } = require('express-validator');
const Facilitators = require('../models/Facilitators');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const multer = require("multer");
const path = require("path");

// var filename;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./static/uploads/images");
//   },
//   filename: (req, file, cb) => {
//     filename = file.originalname;
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage ,
//    limits:{
//     fileSize:1000000000
//    }
// });

//Image  

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
    fileSize: 1000000000
  }
});


// create a user using a post "/api/add facilitators"
router.post('/add_facilitators', upload.single("image"),
  (body('name', 'Enter a valid name.'),
    body('age', 'Enter your age.'),
    body('experience', 'Enter your work experience.'),
    body('is_police_verified',),
    body('refrence_1_type_name', 'Enter refrence type name.'),
    body('refrence_1_type_number', 'Enter refrence type number'),
    body('refrence_2_type_name', 'Enter refrence type name.'),
    body('refrence_2_type_number', 'Enter refrence type number.'),
    body('father_spouse_name', 'Enter  father/spoush name.'),
    body('father_spouse_age', '.Enter father/spoush age.'),
    body('father_spouse_number', 'Number must be atleast 10 characters'),
    body('father_spouse_address', 'Number must be atleast 10 characters'),
    body('father_spouse_image', 'Number must be atleast 10 characters'),
    body('father_spouse_adhar_number', 'Number must be atleast 10 characters'),
    body('father_spouse_bank_account_details', 'Number must be atleast 10 characters')),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Facilitators.findOne({ phone_number: req.body.phone_number }).count();
    if (user > 0) {
      return res.status(400).json({ error: "This mobile number already exists." })
    }
    console.log(req.body);
    customer_response = await Facilitators.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      email_id: req.body.email_id,
      skillset: req.body.skillset,
      pf_no: req.body.pf_no,
      email_id: req.body.email_id,
      blood_group: req.body.blood_group,
      alternative_phone_number: req.body.alternative_phone_number,
      experience: req.body.experience,
      date_of_joining: req.body.date_of_joining,
      date_of_exit: req.body.date_of_exit,
      date_of_birth: req.body.date_of_birth,
      education: req.body.education,
      active: req.body.active,
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
      designation: req.body.designation,
      esi_number: req.body.esi_number,
      pan_card_number: req.body.pan_card_number,
      image: '/static/uploads/images/' + filename,
    });
    console.log(customer_response);
    let user_data = await Facilitators.findOne({ phone_number: req.body.phone_number })
    res.json({
      "status": "success",
      "data": user_data,
      "message": "Success."
    })
  });


router.post('/edit_facilitators', upload.single("image"),
  (body('f_mobile_number', 'Number must be atleast 10 characters')),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Facilitators.findOne({ _id: req.body.id }).count();
    // if (user > 0) {
    //     return res.status(400).json({ error: "This mobile number already exists." })
    // }
    const updatedata = async () => {
      let result = await Facilitators.updateMany(
        { '_id': ObjectID(req.body.id) }, {
        $set: {
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email_id: req.body.email_id,
          skillset: req.body.skillset,
          pf_no: req.body.pf_no,
          email_id: req.body.email_id,
          blood_group: req.body.blood_group,
          alternative_phone_number:req.body.alternative_phone_number,
          experience: req.body.experience,
          date_of_joining: req.body.date_of_joining,
          date_of_exit: req.body.date_of_exit,
          date_of_birth: req.body.date_of_birth,
          education: req.body.education,
          active: req.body.active,
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
          designation: req.body.designation,
          esi_number: req.body.esi_number,
          pan_card_number: req.body.pan_card_number,
          image: '/static/uploads/images/' + filename,
        }
      }
      )
      console.log(result);
    }
    updatedata();
    let update_user = await Facilitators.findOne({ '_id': ObjectID(req.body.id) });
    console.log(req.body);
    res.json({
      "status": "success",
      "data": update_user,
      "message": "Success."
    })
  });

router.post('/update_facilitator_status',
  (body()),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Facilitators.findOne({ id: ObjectID(req.body.id) }).count();

    if (user == 0) {
      return res.status(400).json({ error: "This facilitator does not exists." })
    }
    const updatedata = async () => {
      let result = await Facilitators.updateMany(
        { '_id': ObjectID(req.body.f_id) }, {
        $set: {
          f_status: req.body.f_new_status,

        }
      }
      )
      console.log(result);
    }
    updatedata();

    let user_data = await Facilitators.findOne({ _id: ObjectID(req.body.id) });
    console.log(req.body);
    res.json({
      "status": "success",
      "data": user_data,
      "message": "Success."
    })
  })




router.post('/get_facilitators_by_id',
  (body()),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Facilitators.findOne({ _id: ObjectID(req.body.id) }).count();
    console.log(user);
    if (user == 0) {
      return res.status(400).json({ error: "This facilitator does not exists." })
    }
    console.log(user);
    let user_data = await Facilitators.findOne({ _id: ObjectID(req.body.id) })
    console.log(user_data);
    res.json({
      "status": "success",
      "data": user_data,
      "message": "Success."
    })
  });
  
router.post('/get_all_facilitators',
  async (req, res) => {
    let user = await Facilitators.find().sort({ user_date: -1 });
    res.json({
      "status": "success",
      "data": user,
      "message": "Success."
    });
  });




module.exports = router;




