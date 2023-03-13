const express = require("express");
const { body, validationResult } = require("express-validator");
const Flat = require("../models/Flat");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add flat....
router.post(
  "/add_flat",
  (body("flat_number", "Enter a valid number."),
   body("flat_description", "Enter flat description."),
   body("apartment_id", "Enter apartment_id."),
   body("flat_status", "Enter flatstatus.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Flat.create({
      flat_number:req.body.flat_number,
      flat_type:req.body.flat_type,
      block_id:req.body.block_id,
      block:req.body.block,
      community:req.body.community,
      flat_status:req.body.flat_status,
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
    "/edit_flat",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Flat.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Flat.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
              flat_number:req.body.flat_number,
              flat_type:req.body.flat_type,
              block_id:req.body.block_id,
              block:req.body.block,
              community:req.body.community,
              flat_status:req.body.flat_status,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Flat.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );
  // get single flat byt id

  router.post("/get_flat_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Flat.findOne({ _id: ObjectID(req.body.id)}).count();
    if (user == 0) {
      return res.status(400).json({ error: "This Flat does not exists." });
    }
    let user_data = await Flat.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  // get_flats_by_block_id
  router.post('/get_flats_by_block_id',body(),async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json({errors:errors.array()});
    }
    let user=await Flat.find({block_id:req.body.block_id});
    if(user==0){
    return res.status(400).json({error:"this id does not exist."});
    }
    res.json({
      status:"success",
      data:user,
      message:"success"
  
    })
  
    })

  // get flats by apartment id
  router.post('/get_flats_by_apartment_id',body(),async(req,res)=>{
     
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  let user=await Flat.find({apartment_id:req.body.apartment_id});
  if(user==0){
  return res.status(400).json({error:"this id does not exist.."});
  }
  res.json({
    status:"success",
    data:user,
    message:"success"

  })

  })

//   get  all flat

router.post('/get_all_flat',async(req,res)=>{
    let community =await Flat.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});



module.exports = router;
