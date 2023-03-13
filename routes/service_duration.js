const express = require("express");
const { body, validationResult } = require("express-validator");
const Service_Duration = require("../models/Service_duration");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add Service Duration....
router.post(
  "/add_service_duration",
   (body("duration_id", "Enter duration id."),
   body("duration_title", "Enter duration title."),
   body("duration_status", "Enter duration status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Service_Duration.create({
      duration_id:req.body.duration_id,
      duration_title:req.body.duration_title,
      duration_status:req.body.duration_status,
    });

    console.log(community_response);
    res.json({
      status: "success",
      data: community_response,
      message: "Success.",
    });
  }
);

// Edit service duration 
router.post(
    "/edit_service_duration",
    (body()),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Service_Duration.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Service_Duration.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
                duration_id:req.body.duration_id,
                duration_title:req.body.duration_title,
                duration_status:req.body.duration_status,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Service_Duration.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );
  // get single service duration byt id

  router.post("/get_service_duration_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Service_Duration.findOne({ _id: ObjectID(req.body.id)}).count();
    if (user == 0) {
      return res.status(400).json({ error: "This service duration not exists." });
    }
    let user_data = await Service_Duration.findOne({ _id: ObjectID(req.body.id) });
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


//   get  all service duration

router.post('/get_all_service_duration',async(req,res)=>{
    let community =await Service_Duration.find().sort({date:-1});
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});



module.exports = router;
