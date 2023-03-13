const express = require("express");
const { body, validationResult } = require("express-validator");
const Pricing = require("../models/Pricing");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add pricing....
router.post(
  "/add_pricing",
  (body("community_id", "Enter a valid name."),
   body("service_id", "Enter flat description."),
   body("duration_id", "Enter apartment_id."),
   body("duration_title", "Enter duration_title."),
   body("price", "Enter apartment_id."),
   body("pricing_status", "Enter flatstatus.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Pricing.create({
        community_id:req.body.community_id,
        service_id:req.body.service_id,
        duration_id:req.body.duration_id,
        duration_title:req.body.duration_title,
        price:req.body.price,
        pricing_status:req.body.pricing_status,
    });

    console.log(community_response);
    res.json({
      status: "success",
      data: community_response,
      message: "Success.",
    });
  }
);
// Edit community
router.post(
    "/edit_pricing",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Pricing.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Pricing.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
              community_id:req.body.community_id,
              service_id:req.body.service_id,
              duration_id:req.body.duration_id,
              duration_title:req.body.duration_title,
              price:req.body.price,
              pricing_status:req.body.pricing_status,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Pricing.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );
  // get single flat byt id
  router.post("/get_pricing_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Pricing.findOne({ _id: ObjectID(req.body.id)}).count();
    if (user == 0) {
      return res.status(400).json({ error: "This id does not exists." });
    }
    let user_data = await Pricing.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  


//   get  all community

router.post('/get_all_pricing',async(req,res)=>{
    let community =await Pricing.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});



module.exports = router;
