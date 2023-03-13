const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
var ObjectID = require("mongodb").ObjectID;
const NodeGeocoder = require("node-geocoder");
const JWT_SECRET = "mynameissazidkhan";
const multer = require("multer");
const { validate } = require("../models/Bookings");
const path = require("path");

//   for use image

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
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});

// get location
const options = {
  provider: "google",
  // Optional depending on the providers
  //fetch: customFetchImplementation,
  apiKey: "AIzaSyC2ZE-_AfBGLaEOVuMAG_k_L74JtxPikpA", // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

/*
 * send otp to register and login
 */
router.post(
  "/send_otp",
  body("user_mobile_number", "Number must be atleast 10 digit."),
  async (req, res) => {
    var mob_num = req.body.user_mobile_number;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ user_mobile_number: mob_num }).count();
    var user_otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    //  ----- start code of text local----
    // var https = require("https");
    // var urlencode = require("urlencode");
    // const message = urlencode(
    //   `${user_otp}, is your OTP to login. Sharing it with anyone gives full access to your Action Plus Bharath account. Action Plus never calls you to verify OTP.`
    // );
    // var numbers = req.body.user_mobile_number;
    // var apiKey = "NTk2NjQ5NGQ0YzU1NDg2ZjY0NzE0MzQxNjU1OTYyNTQ=";
    // var sender = "ACNPLS";
    // var url =
    //   "https://api.textlocal.in/send/?" +
    //   "apiKey=" +
    //   apiKey +
    //   "&sender=" +
    //   sender +
    //   "&numbers=" +
    //   numbers +
    //   "&message=" +
    //   message;
    // callback = function (response) {
    //   var str = "";
    //   //another chunk of data has been recieved, so append it to `str`
    //   response.on("data", function (chunk) {
    //     str += chunk;
    //   });

    //   //the whole response has been recieved, so we just print it out here
    //   response.on("end", function () {
    //     console.log(str);
    //   });
    // };

    // //console.log('hello js'))
    // https.request(url, callback).end();
    //  ----- end code of text local----

    //url encode instalation need to use $ npm install urlencode

    // const accountSid = "AC64d0383830c2b946f1228d1b523b6c47";
    // const authToken = "46446b42d9a293556714dcab12a61cdc";

    // const twilio = require("twilio");
    // const client = new twilio(accountSid, authToken);

    // client.messages
    //   .create({
    //     body: "Action Plus " + user_otp,
    //     to: "+91" + mob_num,
    //     from: "+19014035349",
    //   })
    //   .then((message) => console.log(message.sid));

    mobile_number9 = "9999999999";
    mobile_number8 = "8888888888";
    mobile_number7 = "7777777777";
    mobile_number6 = "6666666666";
    mobile_number5 = "5555555555";
    mobile_number4 = "4444444444";
    mobile_number3 = "3333333333";
    mobile_number2 = "2222222222";
    mobile_number1 = "1111111111";
    mobile_number0 = "0000000000";

    req_number = req.body.user_mobile_number;

    // if (
    //   req_number == mobile_number9 ||
    //   req_number == mobile_number8 ||
    //   req_number == mobile_number7 ||
    //   req_number == mobile_number6 ||
    //   req_number == mobile_number5 ||
    //   req_number == mobile_number4 ||
    //   req_number == mobile_number3 ||
    //   req_number == mobile_number2 ||
    //   req_number == mobile_number1 ||
    //   req_number == mobile_number0
    // ) {
    //   console.log(req_number);
    //   // return;
    //   var otp = "1234";
    //   let result = await User.create(
    //     { user_mobile_number: req.body.user_mobile_number,user_otp: otp }
    //   );
    // } else{
    //   let result = await User.updateMany(
    //     { user_mobile_number: req.body.user_mobile_number },
    //     { $set: { user_otp: user_otp } }
    //   );
    // }
    if (user > 0) {
      if (
        req_number == mobile_number9 ||
        req_number == mobile_number8 ||
        req_number == mobile_number7 ||
        req_number == mobile_number6 ||
        req_number == mobile_number5 ||
        req_number == mobile_number4 ||
        req_number == mobile_number3 ||
        req_number == mobile_number2 ||
        req_number == mobile_number1 ||
        req_number == mobile_number0
      ) {
        console.log(req_number);
        // return;
        var otp = "1234";
        let result = await User.updateMany(
          { user_mobile_number: req.body.user_mobile_number },
          { $set: { user_otp: otp } }
        );
      } else {
        let result = await User.updateMany(
          { user_mobile_number: req.body.user_mobile_number },
          { $set: { user_otp: user_otp } }
        );
      }
    } else {
      if (
        req_number == mobile_number9 ||
        req_number == mobile_number8 ||
        req_number == mobile_number7 ||
        req_number == mobile_number6 ||
        req_number == mobile_number5 ||
        req_number == mobile_number4 ||
        req_number == mobile_number3 ||
        req_number == mobile_number2 ||
        req_number == mobile_number1 ||
        req_number == mobile_number0
      ) {
        console.log(req_number);
        // return;
        var otp = "1234";
        user = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_email: req.body.user_email,
          user_image: req.body.user_image,
          user_mobile_number: req.body.user_mobile_number,
          user_otp: otp,
        });
      } else {
        user = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_email: req.body.user_email,
          user_image: req.body.user_image,
          user_mobile_number: req.body.user_mobile_number,
          user_otp: user_otp,
        });
      }
    }
    let user_update = await User.findOne({
      user_mobile_number: req.body.user_mobile_number,
    });
    res.json({
      status: "success",
      status_code: "200",
      data: user_update,
      message: "OTP Sent Successfully.",
    });
  }
);



// edit user profiles
router.post(
  "/edit_user_profiles",
  upload.single("user_image"),
  body(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({
      user_mobile_number: req.body.user_mobile_number,
    }).count();
    if (user == 0) {
      return res.status(400).json({ error: "This mobile number not exists." });
    }
    const updatedata = async () => {
      await User.updateMany(
        { user_mobile_number: req.body.user_mobile_number },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_email: req.body.user_email,
            user_image: "/static/uploads/images/" + filename,
            user_mobile_number: req.body.user_mobile_number,
          },
        }
      );
    };
    updatedata();
    let update_data = await User.find({
      user_mobile_number: req.body.user_mobile_number,
    });
    res.json({
      status: "success",
      data: update_data,
      message: "Success.",
    });
  }
);

/*
 * Verifying OTP for login amd registration
 */
router.post("/verify_otp", async (req, res) => {
  let user = await User.find({
    user_mobile_number: req.body.user_mobile_number,
    user_otp: req.body.user_otp,
  }).count();
  let user_date = await User.find({
    user_mobile_number: req.body.user_mobile_number,
    user_otp: req.body.user_otp,
  });
  if (user > 0) {
    //   const createToken =async()=>{
    //   const token = await jwt.sign({_id:"62b45b0df4772056db6acc8e"},'${process.env.REACT_APP_TOKEN_KEY}')
    //   console.log(token);
    //   const userVer= jwt.verify(token,'${process.env.REACT_APP_TOKEN_KEY}');
    //   console.log(userVer);
    // }
    // createToken();
    // let update_data = await User.findOne({
    //   user_mobile_number: req.body.user_mobile_number,
    // });
    // const name = update_data.first_name;
    // console.log(name);
    // var https = require("https");
    // var urlencode = require("urlencode");
    // const message = urlencode(
    //   `Action Plus: Hi ${name}. Thank you for registering with Action Plus Bharat. Browse our catalog to experience the professional services.`
    // );
    // var numbers = req.body.user_mobile_number;
    // var apiKey = "NTk2NjQ5NGQ0YzU1NDg2ZjY0NzE0MzQxNjU1OTYyNTQ=";
    // var sender = "ACNPLS";
    // var url =
    //   "https://api.textlocal.in/send/?" +
    //   "apiKey=" +
    //   apiKey +
    //   "&sender=" +
    //   sender +
    //   "&numbers=" +
    //   numbers +
    //   "&message=" +
    //   message;
    // callback = function (response) {
    //   var str = "";
    //   //another chunk of data has been recieved, so append it to `str`
    //   response.on("data", function (chunk) {
    //     str += chunk;
    //   });

    //   //the whole response has been recieved, so we just print it out here
    //   response.on("end", function () {
    //     console.log(str);
    //   });
    // };
    // console.log(url);
    // https.request(url, callback).end();
    res.json({
      status: "success",
      data: user_date,
      message: "OTP verified.",
    });
  } else {
    res.json({
      status: "fail",
      data: "",
      message: "OTP is incorrect.",
    });
  }
});

// get_user_by_phone_number

router.post("/get_user_by_phone_number", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await User.find({
    user_mobile_number: req.body.user_mobile_number,
  });
  console.log(user);
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

//get users by users id
router.post("/get_users_by_user_id", body(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  let user = await User.find({ _id: ObjectID(req.body.id) });
  if (user) {
    res.json({
      status: "success",
      data: user,
      message: "success",
    });
  }
});

//get_lacation

router.post("/get_location", async (req, res) => {
  //try{
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const res2 = await geocoder.reverse({ lat: latitude, lon: longitude });
  res.status(200).send({ success: true, msg: true, data: res2 });

  // }catch(error){
  //   res.status(400).send({success:false,msg:"fail", error:error});
  // }
});

/* ******************************************************************************* */

/*
 * Sends OTP to login
 */
// router.post(
//   "/register_customer",
//   (body("user_mobile_number", "number must be atleast 10 digit").isLength({
//     min: 10,
//   }),
//   body("user_otp")),
//   async (req, res) => {
//     var mob_num = req.body.user_mobile_number;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let user = await User.findOne({ user_mobile_number: mob_num }).count();
//     console.log(user);
//     if (user > 0) {
//       return res.status(400).json({ error: "User already registered." });
//     }
//     console.log(user);
//     var User_otp = (Math.floor(Math.random() * 10000) + 10000)
//       .toString()
//       .substring(1);

//     const accountSid = "AC8b97ed112440ee404b64adc4a6b26a11"; // Your Account SID from www.twilio.com/console
//     const authToken = "5c4f3ebfff500da0c037125945d594dc"; // Your Auth Token from www.twilio.com/console

//     const twilio = require("twilio");
//     const client = new twilio(accountSid, authToken);

//     client.messages
//       .create({
//         body: "Action Plus " + User_otp,
//         to: mob_num, // Text this number
//         from: "+19014035349", // From a valid Twilio number
//       })
//       .then((message) => console.log(message.sid));

//     user = await User.create({
//       user_mobile_number: mob_num,
//       user_otp: req.body.user_otp,
//     });

//     // tokens

//     // const data = {
//     //   user: {
//     //     id: user.id,
//     //   },
//     // };
//     // const JwtData = jwt.sign(data, JWT_SECRET);
//     // console.log(JwtData);
//     // console.log(user);
//     // res.json({
//     //   status: "success",
//     //   data: JwtData,
//     //   message: "OTP Sent Successfully.",
//     // });
//   }
// );
// /*
//  * Sends OTP to login
//  */
// router.post(
//   "/send_otp_to_login",
//   body("user_mobile_number", "number must be atleast 10 digit").isLength({
//     min: 10,
//   }),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let user = await User.findOne({
//       user_mobile_number: req.body.user_mobile_number,
//     }).count();
//     let user_date = await User.findOne({
//       user_mobile_number: req.body.user_mobile_number,
//     });

//     if (user == 0) {
//       return res.status(400).json({ error: "User not registered." });
//     }
//     var User_otp = (Math.floor(Math.random() * 10000) + 10000)
//       .toString()
//       .substring(1);

//     const updatedata = async () => {
//       let result = await User.updateMany(
//         { user_mobile_number: req.body.user_mobile_number },
//         { $set: { user_otp: User_otp } }
//       );
//       console.log(result);
//     };
//     updatedata();

//     res.json({
//       status: "success",
//       data: "",
//       message: "OTP Sent Successfully.",
//     });
//   }
// );

// router.post(
//   "/resend_otp_to_login",
//   body("user_mobile_number", "number must be atleast 10 digit").isLength({
//     min: 10,
//   }),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let user = await User.findOne({
//       user_mobile_number: req.body.user_mobile_number,
//     }).count();
//     let user_date = await User.findOne({
//       user_mobile_number: req.body.user_mobile_number,
//     });

//     if (user == 0) {
//       return res.status(400).json({ error: "User not registered." });
//     }
//     var User_otp = (Math.floor(Math.random() * 10000) + 10000)
//       .toString()
//       .substring(1);

//     const updatedata = async () => {
//       let result = await User.updateMany(
//         { user_mobile_number: req.body.user_mobile_number },
//         { $set: { user_otp: User_otp } }
//       );
//       console.log(result);
//     };
//     updatedata();

//     res.json({
//       status: "success",
//       data: "",
//       message: "OTP Sent Successfully.",
//     });
//   }
// );

module.exports = router;
