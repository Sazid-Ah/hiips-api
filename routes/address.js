const express = require('express');
const { body, validationResult } = require('express-validator');
const Address= require('../models/Address');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID; 
// create a user using a post "/api/add address"
router.post('/add_customer_address',
        (body('first_name', 'Enter a valid name.'),
        body('last_name', 'Enter a valid name'),
        body('community_id','Enter community id.'),
        body('block_id','Enter block id.'),
        body('flat_type_id','Enter flat type id.'),
        body('flat_id','Enter flat id.'), 
        body('phone_number', 'Number must be atleast 10 characters'),
        body('email_address', 'Enter a valid email'),
        body('house_number', 'Number must be atleast 10 characters'),
        body('street_name', 'Number must be atleast 10 characters'),
        body('area', 'Number must be atleast 10 characters'),
        body('city', 'Number must be atleast 10 characters'),
        body('pin_code', 'Number must be atleast 6 characters'),
        body('address_type', 'Number must be atleast 6 characters')),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
        customer_response = await Address.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            community_id: req.body.community_id,
            block_id: req.body.block_id,
            flat_type_id: req.body.flat_type_id,
            flat_id: req.body.flat_id,
            phone_number: req.body.phone_number,
            email_address:req.body.email_address,
            house_number:req.body.house_number,
            street_name:req.body.street_name,
            area: req.body.area,
            city: req.body.city,
            pin_code:req.body.pin_code,
            address_type: req.body.address_type,
        });
        console.log(customer_response);
        res.json({
            "status": "success",
            "data": customer_response,
            "message": "Success."
        })
    });
 
  

     router.post('/edit_customers_address',
       (body()),  
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let user = await Address.findOne({_id:ObjectID(req.body.id)});
        const updatedata = async () => {   
          await Address.updateMany(
            { '_id': ObjectID(req.body.id) }, { $set: { first_name: req.body.first_name,
                last_name: req.body.last_name,
                community_id: req.body.community_id,
                block_id: req.body.block_id,
                flat_type_id: req.body.flat_type_id,
                flat_id: req.body.flat_id,
                phone_number: req.body.phone_number,
                email_address:req.body.email_address,
                house_number:req.body.house_number,
                street_name:req.body.street_name,
                area: req.body.area,
                city: req.body.city,
                pin_code:req.body.pin_code,
                address_type: req.body.address_type
            } } )
        }
        updatedata();
        let update_data = await Address.findOne({_id:ObjectID(req.body.id)});
         res.json({
            "status": "success",
            "data": update_data,
            "message": "Success."
        })
    })


//     router.post('/update_facilitator_status',
//        (body()),  
//         async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         let user = await Address.findOne({ f_id: ObjectID(req.body.f_id) }).count();

//         if (user == 0) {
//             return res.status(400).json({ error: "This facilitator does not exists." })
//         }
//         const updatedata = async () => {   
//           let result = await Address.updateMany(
//             { '_id': ObjectID(req.body.f_id) }, { $set: { f_status: req.body.f_new_status,
               
//             } }
//           )
//           console.log(result);
//         }
//         updatedata();

//         let user_data = await Address.findOne({ f_id: ObjectID(req.body.f_id) })
//          console.log(req.body);
//          res.json({
//             "status": "success",
//             "data": user_data,
//             "message": "Success."
//         })
//     })
    


    router.post('/get_address_by_phone_number',
    (body()),  
     async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     let user = await Address.find({ phone_number:req.body.phone_number }).count();
     if (user == 0) {
         return res.status(400).json({ error: "This phone  does not exists." })
     }
      console.log(user);
    let user_data = await Address.find({ phone_number:(req.body.phone_number) });
      console.log(user_data);
      res.json({
         "status": "success",
         "data": user_data,
         "message": "Success."
     })
 })
 


    router.post('/get_all_customers_address',
        async (req, res) => {
        let user = await Address.find().sort({user_date:-1});
        res.json({
          "status": "success",
          "data": user,
          "message": "Success."
        });
        });





module.exports = router;




