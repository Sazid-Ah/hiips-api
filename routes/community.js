const express = require("express");
const { body, validationResult } = require("express-validator");
const Community = require("../models/Community");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add community....
router.post(
  "/add_cummunity",
  (body("community_name", "Enter a valid name."),
   body("community_description", "Enter community description."),
   body("community_address_line_1", "Enter address 1."),
   body(" community_address_line_2", "Enter address 2."),
   body("community_landmark", "Enter landmark."),
   body("community_city", "Enter city."),
   body("community_state", "Enter state."),
   body("community_pincode", "Enter  pincode."),
   body("community_status","enter a community status")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Community.create({
        community_name:req.body.community_name,
        community_description:req.body.community_description,
        community_address_line_1:req.body.community_address_line_1,
        community_address_line_2:req.body.community_address_line_2,
        community_landmark:req.body.community_landmark,
        community_city: req.body.community_city,
        community_state: req.body.community_state,
        community_pincode: req.body.community_pincode,
        community_status: req.body.community_status,
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
    "/edit_community",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Community.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Community.updateMany({ _id:ObjectID(req.body.id) },
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
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Community.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );

  // get single community by id 
  
  router.post("/get_community_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Community.findOne({ _id: ObjectID(req.body.id) }).count();
    if (user == 0) {
      return res.status(400).json({ error: "This Community does not exists." });
    }
    let user_data = await Community.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  





//   get  all community

router.post('/get_all_community',async(req,res)=>{
    let community =await Community.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});



  


module.exports = router;
