const express = require("express");
const { body, validationResult } = require("express-validator");
const Flat_type = require("../models/Flat_type");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add Flat type....
router.post(
  "/add_flat_type",
   body("flat_type_title", "Enter flat type title.").not().isEmpty(),
   body("flat_type_id"),
   body("community_id", "Enter community ID.").not().isEmpty(),
   body("community_name", "Enter community name.").not().isEmpty(),
   body("flat_area", "Enter flat area.").not().isEmpty(),
   body("flat_type_status", "Enter flat type status.").not().isEmpty(),
   body("maid_service_price", "Enter maid service price.").not().isEmpty(),
   body("deep_cleaning_price", "Enter deep cleaning price.").not().isEmpty(),
  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Flat_type.create({
              flat_type_title:req.body.flat_type_title,
              flat_type_id:req.body.flat_type_id,
              community_id:req.body.community_id,
              community_name:req.body.community_name,
              flat_area:req.body.flat_area,
              maid_service_price:req.body.maid_service_price,
              deep_cleaning_price:req.body.deep_cleaning_price,
              flat_type_status:req.body.flat_type_status,
    });

    console.log(community_response);
    res.json({
      status: "success",
      data: community_response,
      message: "Success.",
    });
  }
);

// Edit flat type
router.post(
    "/edit_flat_type",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Flat_type.findOne({ _id:ObjectID(req.body.id)}).count();
      const updatedata = async () => {
        let category = await Flat_type.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
              flat_type_title:req.body.flat_type_title,
              flat_type_id:req.body.flat_type_id,
              community_id:req.body.community_id,
              community_name:req.body.community_name,
              flat_area:req.body.flat_area,
              flat_type_status:req.body.flat_type_status,
              maid_service_price:req.body.maid_service_price,
              deep_cleaning_price:req.body.deep_cleaning_price,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Flat_type.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );
  // get single flat type byt id
  router.post("/get_flat_type_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Flat_type.findOne({ _id: ObjectID(req.body.id)}).count();
    if (user == 0) {
      return res.status(400).json({ error: "This flat type does not exists." });
    }
    let user_data = await Flat_type.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  // get flats by apartment id

//   router.post('/get_flats_by_apartment_id',body(),async(req,res)=>{
     
//   const errors=validationResult(req);
//   if(!errors.isEmpty())
//   {
//     return res.status(400).json({errors:errors.array()});
//   }
//   let user=await Service_Duration.find({apartment_id:req.body.apartment_id});
//   if(user==0){
//   return res.status(400).json({error:"this id does not exist.."});
//   }
//   res.json({
//     status:"success",
//     data:user,
//     message:"success"

//   })
//   })


router.post("/get_flat_types_by_community_id", 
body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Flat_type.findOne({community_id:req.body.community_id}).count();
  if (user == 0) {
    return res.status(400).json({ error: "This flat type does not exists." });
  }
  let user_data = await Flat_type.find({community_id:req.body.community_id });
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});






//   get  all flat type

router.post('/get_all_flat_type',async(req,res)=>{
    let community =await Flat_type.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});



module.exports = router;
