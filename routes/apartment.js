const express = require("express");
const { body, validationResult } = require("express-validator");
const Apartment = require("../models/Apartment");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add apartment....
router.post(
  "/add_apartment",
  (body("apartment_name", "Enter a valid name."),
   body("apartment_description", "Enter apartment description."),
   body("block_id", "Enter  block_id."),
   body("apartment_status", "Enter apartment status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Apartment.create({
        apartment_name:req.body.apartment_name,
        apartment_description:req.body.apartment_description,
        block_id:req.body.block_id,
        apartment_status:req.body.apartment_status,
    });

    console.log(community_response);
    res.json({
      status: "success",
      data: community_response,
      message: "Success.",
    });
  }
);
// Edit apartment
router.post(
    "/edit_apartment",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Apartment.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Apartment.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
                apartment_name:req.body.apartment_name,
                apartment_description:req.body.apartment_description,
                block_id:req.body.block_id,
                apartment_status:req.body.apartment_status,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Apartment.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );

//   get single apartment by id 

  router.post("/get_apartment_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Apartment.findOne({ _id: ObjectID(req.body.id) }).count();
    if (user == 0) {
      return res.status(400).json({ error: "This blocks does not exists."});
    }
    let user_data = await Apartment.findOne({_id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
//  get apartments by block by id 

router.post('/get_apartments_by_block_id',(body()),async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()});
  }
  let user=await Apartment.find({block_id:req.body.block_id});
  if(user==0){
    return res.status(400).json({error:"this id does not exist."});
  }
  res.json({
  status:"success",
  data:user,
  message:"success"
  })
})









//   get  all apartment

router.post('/get_all_apartment',async(req,res)=>{
    let community =await Apartment.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});




module.exports = router;
