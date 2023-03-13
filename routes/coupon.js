const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const { body, validationResult } = require("express-validator");
const ObjectID = require("mongodb").ObjectID;

// search route
// router.post('/search/:key',async(req,res)=>{

//   let data= await Category.find(
//     {
//       "$or":[
//         {"category_id":{$regex:req.params.key}},
//         {"category_name":{$regex:req.params.key}},
//         {"u_id":{$regex:req.params.key}}
//       ]
//     })
//   res.send(data);

// });

// add tag routes
router.post(
  "/add_coupon",
  body("discount_type", "enter the discount type."),
  body("coupon_amount", "enter here coupon amount."),
  body("discount_amount", "enter here discount_amount.").isLength({ max:5}),
  body("status", "enter here status."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let coupon = await Coupon.create({
      discount_type: req.body.discount_type,
      coupon_code: req.body.coupon_code,
      date_expired: req.body.date_expired,
      discount_amount: req.body.discount_amount,
      date_created: req.body.date_created,
      status: req.body.status,
    });
    if (coupon) {
      res.json({
        status: "success",
        data: coupon,
        message: "success",
      });
    } else {
      res.json({
        status: "failed",
        data: "",
        message: "failed",
      });
    }
  }
);

// edit coupon
router.post(
  "/edit_coupon",
  body("id", "enter here id.").not().isEmpty(),
  body("discount_amount","enter here discount_amount.").isLength({max:5}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let coupon = await Coupon.findOne({ _id: ObjectID(req.body.id) });
    if (!coupon) {
      return res.status(400).send({ errors: "This id not exist." });
    }
    const updatedata = async () => {
      await Coupon.updateMany(
        { _id: ObjectID(req.body.id) },
        {
          $set: {
            discount_type: req.body.discount_type,
            coupon_code: req.body.coupon_code,
            date_expired: req.body.date_expired,
            discount_amount:req.body.discount_amount,
            date_created: req.body.date_created,
            status: req.body.status,
          },
        }
      );
    };
    updatedata();
    let data = await Coupon.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: data,
      message: "success",
    });
  }
);

// get  single coupon
router.post(
  "/get_single_coupon_by_id",
  body("id", "enter here id.").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let coupon = await Coupon.findOne({ _id: ObjectID(req.body.id) });
    if (!coupon) {
      return res.status(400).send({ errors: "This  id not exist." });
    } else {
      res.json({
        status: "success",
        data: coupon,
        message: "success",
      });
    }
  }
);


// update status
router.post(
  "/update_status",
  body("id", "enter here id.").not().isEmpty(),
  body("status", " Plaese enter status 0/1 .").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let coupon = await Coupon.findOne({ _id: ObjectID(req.body.id) });
    if (!coupon) {
      return res.status(400).send({ errors: "This  id not exist." });
    } else {
      await Coupon.updateMany(
        { _id: ObjectID(req.body.id) },
        {
          $set: {
            status: req.body.status,
          },
        }
      );
      let coupon = await Coupon.findOne({ _id: ObjectID(req.body.id) });
      res.json({
        status: "success",
        data: coupon,
        message: "success",
      });
    }
  }
);


// apply coupons routes
router.post(
  "/apply_coupon",
  body("coupon_code", "Please Enter Correct coupon code.").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erors: errors.array() });
    }
    let single = await Coupon.findOne({ coupon_code: req.body.coupon_code });
    if (single) {
      var date1 = single.date_expired;
      var strf= single.status;
      console.log( typeof strf)
      // var date2 = new Date();
      let date_ob = new Date();
      // current date
      // adjust 0 before single digit date
      console.log(date_ob);
      let date = ("0" + date_ob.getDate()).slice(2);
      
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      
      // current year
      let year = date_ob.getFullYear();
      
      
      // prints date in  format
      // let current_date=(date + "-" + month + "-" +  year);
       let current_date=(year + "-" + month + "-" + date);
      
      console.log(date1);
      console.log(current_date);
      if (single.status == "1"){
        if (date1 >= current_date){
        // if (date1.localeCompare(current_date)){
          res.json({
            status: "success",
            data: single,
            message: "Verified coupon",
          });
          
        }
        else {
          res.json({
            status: "Failed",
            data: "",
            message: "Coupon Date Expired.",
          });
        }
      } else {
        res.json({
          status: "Failed",
          data: "",
          message: "Does not active Coupon.",
        });
      }
    } else {
      res.json({
        status: "Failed",
        data: "",
        message: "Coupon does not exist.",
      });
    }
  }
);

// get all 
router.get("/get_all_coupons", async (req, res) => {
  let coupon = await Coupon.find().sort({date:-1});
  res.json({
    status: "success",
    data: coupon,
    message: "success",
  });
});

module.exports = router;
