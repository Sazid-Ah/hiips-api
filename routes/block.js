const express = require("express");
const { body, validationResult } = require("express-validator");
const Block = require("../models/Block");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post add blocks....
router.post(
  "/add_blocks",
  (body("block_name", "Enter a valid name."),
   body("block_description", "Enter block description."),
   body("community_id", "Enter community_id."),
   body("block_status", "Enter block status.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    community_response = await Block.create({
        block_name:req.body.block_name,
        block_description:req.body.block_description,
        community_id:req.body.community_id,
        community_name:req.body.community_name,
        block_status:req.body.block_status,
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
    "/edit_blocks",
    (body()),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Block.findOne({_id:req.body.id}).count();
      const updatedata = async () => {
        let category = await Block.updateMany({ _id:ObjectID(req.body.id) },
          {
            $set: {
                block_name:req.body.block_name,
                block_description:req.body.block_description,
                community_id:req.body.community_id,
                community_name:req.body.community_name,
                block_status:req.body.block_status,
            },
          }
          );
        console.log(category)
      };
      updatedata();
      let community = await Block.findOne({_id:ObjectID(req.body.id)});
      res.json({
        status: "success",
        data: community,
        message: "Success.",
      });
    }
  );
//  get single blocks by id 

  router.post("/get_blocks_by_id", 
  body(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Block.findOne({ _id: ObjectID(req.body.id) }).count();
    if (user == 0) {
      return res.status(400).json({ error: "This blocks does not exists." });
    }
    let user_data = await Block.findOne({ _id: ObjectID(req.body.id) });
    res.json({
      status: "success",
      data: user_data,
      message: "Success.",
    });
  });
  // get blocks by community id 
 
router.post('/get_blocks_by_community_id',body(),async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.arrar()});
  }
let user = await Block.find({community_id:req.body.community_id});
if(user==0){
  return res.status(400).json({error:"this id not exists"});
} 
res.json({
  status:"success",
  data:user,
  message:"success"

})

}) ; 


//   get  all blocks
router.post('/get_all_blocks',async(req,res)=>{
    let community =await Block.find().sort({date:-1});
    console.log(community);
    res.json({
        status:"success",
        data:community,
        message:"success"
    });
});




module.exports = router;
