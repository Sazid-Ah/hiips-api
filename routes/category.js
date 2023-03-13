const express = require("express");
const { body, validationResult } = require("express-validator");
const Category = require("../models/Category");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
const multer = require("multer");
const path = require("path");




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
const upload = multer({ storage: storage ,
   limits:{
    fileSize:1000000000
   }
});




//  /*fileFilter: (req, file, cb) => {
// //             const fileTypes =/jpeg|jpg|png||PNG|gif/
// //             const mimeType = fileTypes.test(file.mimetype)  
// //             const extname = fileTypes.test(path.extname(file.originalname));
// //             if(mimeType && extname) {
// //                 return cb(null, true)
// //             }
// //             cb('Give proper files formate to upload')
// //         }


// var filename;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./static/uploads/images");
//   },
//   filename: (req, file, cb) => {
//     filename = file.originalname;
//     cb(null, Date.now() + path.extname(file.originalname));
    
//   },
// });
// const upload = multer({ storage: storage ,
//    limits:{
//     fileSize:1000000000
//    },

//    /*fileFilter: (req, file, cb) => {
//             const fileTypes =/jpeg|jpg|png||PNG|gif/
//             const mimeType = fileTypes.test(file.mimetype)  
//             const extname = fileTypes.test(path.extname(file.originalname));
//             if(mimeType && extname) {
//                 return cb(null, true)
//             }
//             cb('Give proper files formate to upload')
//         }*/

// });


// create a user using a post "/api/add_category"

// router.post(
//   "/add_Category",
//   (body("category_name", "Enter a valid name."),
//    body("category_description.")),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     customer_response = await Category.create({
//       category_name:req.body.category_name,
//       category_short_description:req.body.category_short_description,
//       category_description:req.body.category_description,
//       category_image:'/static/uploads/images/'+req.body.category_image,
//       category_status:req.body.category_status,
//     });

//     console.log(customer_response);
//     res.json({
//       status: "success",
//       data: customer_response,
//       message: "Success.",
//     });
//   }
// );

  //add image api 

router.post(
  "/add_Category",upload.single("category_image"),
  (body("category_name", "Enter a valid name."),
   body("category_description.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    customer_response = await Category.create({
      category_name:req.body.category_name,
      category_short_description:req.body.category_short_description,
      category_description: req.body.category_description,
      display_order:req.body.display_order,
      category_image:'/static/uploads/images/'+filename,
      category_status: req.body.category_status,
    });

    console.log(customer_response);
    res.json({
      status: "success",
      data: customer_response,
      message: "Success.",
    });
  }
);




router.post(
  "/edit_category",upload.single("category_image"),
  (body("category_name", "Enter a valid name."),
  body("category_description", "Enter a valid description.")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedata = async () => {
       await Category.updateMany(
        {_id: ObjectID(req.body.c_id)},
        {
          $set:{
            category_name:req.body.category_name,
            category_short_description:req.body.category_short_description,
            category_description: req.body.category_description,
            display_order:req.body.display_order,
            category_image:'/static/uploads/images/'+filename,
            category_status: req.body.category_status,
          }
        }
      )
    }
    updatedata();
    var https = require('https');
    var urlencode = require('urlencode');
    const message =urlencode(`Action Plus: Hi ${name}. Thank you for registering with Action Plus Bharat. Browse our catalog to experience the professional services.`);
    var numbers=req.body.user_mobile_number;
    var apiKey='NTk2NjQ5NGQ0YzU1NDg2ZjY0NzE0MzQxNjU1OTYyNTQ=';
    var sender='ACNPLS';
      var url = "https://api.textlocal.in/send/?"   +'apiKey=' + apiKey +'&sender=' + sender + '&numbers=' + numbers + '&message=' + message
    callback = function(response) {
      var str = '';
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
     
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log(str);
      });
    }
    console.log(url);
    https.request(url, callback).end();
    let category = await Category.findOne({_id:ObjectID(req.body.c_id) })
    res.json({
      status: "success",
      data:category,
      message: "Success.",
    });
  }
);

router.post("/get_category_by_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Category.findOne({ _id: ObjectID(req.body.id) }).count();
  if (user == 0) {
    return res.status(400).json({ error: "This categoty does not exists." });
  }
  let user_data = await Category.findOne({ _id: ObjectID(req.body.id) });
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

router.post("/update_category_status", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await Category.findOne({ _id: ObjectID(req.body.c_id) }).count();

  if (user == 0) {
    return res.status(400).json({ error: "This facilitator does not exists." });
  }
  const updatedata = async () => {
    let result = await Category.updateMany(
      { _id: ObjectID(req.body.c_id) },
      { $set: {category_status: req.body.category_status } }
    );
    console.log(result);
  };
  updatedata();
  let user_data = await Category.findOne({ _id: ObjectID(req.body.c_id) });
  console.log(req.body);
  res.json({
    status: "success",
    data: user_data,
    message: "Success.",
  });
});

router.post("/get_all_category", async (req, res) => {
  let user = await Category.find().sort({user_date:+1});
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});





module.exports = router;
