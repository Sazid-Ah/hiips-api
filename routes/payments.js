const express = require("express");
const { body, validationResult } = require("express-validator");
const Payment = require("../models/Payments");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
// create a user using a post "/api/add_category"
router.post(
  "/add_payments",
  (body("p_customer_name.", "Enter a valid name."),
  body("p_worker_name."),
  body("p_product_service."),
  body("p_payment_method."),
  body("p_status")),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    customer_response = await Payment.create({
      p_customer_name: req.body.p_customer_name,
      p_worker_name: req.body.p_worker_name,
      p_product_service: req.body.p_product_service,
      p_payment_method: req.body.p_payment_method,
      p_status: req.body.p_status,
    });

    console.log(customer_response);
    res.json({
      status: "success",
      data: customer_response,
      message: "Success.",
    });
  }
);

/*
router.post(
    "/edit_payments",
    (body("p_customer_name", "Enter a valid name."),
    body("p_worker_name", "Enter a valid name."),
    body("p_product_service", "Enter a valid name."),
    body("p_payment_method", "Enter a valid name."),
    body("p_status", "Enter a valid description.")),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedata = async () => {
        let category = await Payment.updateMany(
          { _id: ObjectID(req.body.p_id) },
          {
            $set: {
                p_customer_name: req.body.p_customer_name,
                p_worker_name: req.body.p_worker_name,
                p_product_service: req.body.p_product_service,
                p_payment_method: req.body.p_payment_method,
                p_status: req.body.p_status,
            },
          }
        );
        console.log(category); 
      };
      updatedata();


      res.json({
        status: "success",
        data: "",
        message: "Success.",
      });
    }
  );*/
//  router.post('/update_payments_status',
//        (body()),
//         async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         let user = await Payment.findOne({ _id: ObjectID(req.body.id) }).count();

//         if (user == 0) {
//             return res.status(400).json({ error: "This  does not exists." })
//         }
//         const updatedata = async () => {
//           let result = await Payment.updateMany(
//             { '_id': ObjectID(req.body.c_id) }, { $set: { category_status: req.body.category_new_status,

//             } }
//           )
//           console.log(result);
//         }
//         updatedata();

//         let user_data = await Category.findOne({ c_id: ObjectID(req.body.c_id) })
//          console.log(req.body);
//          res.json({
//             "status": "success",
//             "data": user_data,
//             "message": "Success."
//         })
//     })

router.post("/get_all_payments", async (req, res) => {
  let user = await Payment.find().sort({user_date:-1});
  res.json({
    status: "success",
    data: user,
    message: "Success.",
  });
});

router.post;

module.exports = router;
