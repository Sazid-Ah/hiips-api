const express = require("express");
const { body, validationResult } = require("express-validator");
const CommunityRequest = require("../models/CommunityRequest");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add cummunity_request....
router.post(
  "/add_cummunity_request",
  (body("community_name", "Enter a valid name."),
   body("community_description", "Enter community description."),
   body("community_address_line_1", "Enter address 1."),
   body(" community_address_line_2", "Enter address 2."),
   body("community_landmark", "Enter landmark."),
   body("community_city", "Enter city."),
   body("community_state", "Enter state."),
   body("community_pincode", "Enter  pincode."),
   body("community_status","enter a community status."),
   body("user_mobile_number","enter user mobile number.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await CommunityRequest.create({
        community_name:req.body.community_name,
        community_description:req.body.community_description,
        community_address_line_1:req.body.community_address_line_1,
        community_address_line_2:req.body.community_address_line_2,
        community_landmark:req.body.community_landmark,
        community_city: req.body.community_city,
        community_state: req.body.community_state,
        community_pincode: req.body.community_pincode,
        community_status: req.body.community_status,
        user_mobile_number:req.body.user_mobile_number,
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
    "/edit_cummunity_request",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await CommunityRequest.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await CommunityRequest.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
                community_name:req.body.community_name,
                community_description:req.body.community_description,
                community_address_line_1:req.body.community_address_line_1,
                community_address_line_2:req.body.community_address_line_2,
                community_landmark:req.body.community_landmark,
                community_city: req.body.community_city,
                community_state: req.body.community_state,
                community_pincode: req.body.community_pincode,
                community_status: req.body.community_status,
                user_mobile_number:req.body.user_mobile_number,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await CommunityRequest.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );

  // get single community request by id 

  router.post("/get_community_request_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await CommunityRequest.findOne({ _id: ObjectID(req.body.id) }).count();
    if (user == 0) {
      return res.status(400).json({ error: "This Community Request does not exists." });
    }
    let user_data = await CommunityRequest.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  


//   get  all cummunity_request

router.post('/get_all_cummunity_request',async(req,res)=>{
    let community =await CommunityRequest.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});

module.exports = router;
