//We are using request for making an HTTP/HTTPS call to payumoney server
const request = require('request');
const express = require("express");
const router = express.Router();
const jsSHA = require("jssha");
const cors = require('cors');
// const sha = new jsSHA('SHA-512', "TEXT");
const payment = require('../models/Payumoney')


const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config();
router.use(cors());




router.get('/payu-payment', cors(), async (req, res) => { 
const payDetails = {
        txnId:  uuidv4(),
        plan_name : "Test",
        first_name: 'Test',
        email: 'test@example.com',
        mobile: '9999999999',
        service_provide: 'test',
        amount: 1,
        call_back_url : `${process.env.BASE_URL}/payment/success`,
        payu_merchant_key : process.env.PAYU_MERCHANT_KEY,
        payu_merchant_salt_version_1 : process.env.PAYU_MERCHANT_SALT_VERSION_1,
        payu_url : process.env.PAYU_URL,
        payu_fail_url : `${process.env.BASE_URL}/payment/failed`,
        payu_cancel_url : `${process.env.BASE_URL}/payment/cancel`,
        payu_url: process.env.PAYU_URL,
        hashString : '',
        payu_sha_token : ''
    }

    payDetails.hashString = `${process.env.PAYU_MERCHANT_KEY}|${payDetails.txnId}|${parseInt(payDetails.amount)}|${payDetails.plan_name}|${payDetails.first_name}|${payDetails.email}|||||||||||${process.env.PAYU_MERCHANT_SALT_VERSION_1}`,
    payDetails.payu_sha_token = crypto.createHash('sha512').update(payDetails.hashString).digest('hex');

    return res.json({ 
        success: true, 
        code: 200, 
        info: payDetails
    });   
});




router.post('/products/genHash', function(req, res){
	var strdat = '';
	req.on('data', function (chunk) {
        strdat += chunk;
    });
	req.on('end', function()
	{
        var data = JSON.parse(strdat);
		var cryp = crypto.createHash('sha512');
    var text = `${process.env.PAYU_MERCHANT_KEY}|` + data.txnid + '|' + data.amount + '|' + data.pinfo + '|' + data.fname + '|' + data.email + '|||||' + data.udf5 + `||||||${process.env.PAYU_MERCHANT_SALT_VERSION_1}`;
		cryp.update(text);
        console.log(text);
		var hash = cryp.digest('hex');		
		res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(hash);		
	});	
});


router.post('/products/rescheck', function(req, res){
	var strdat = '';
	req.on('data', function (chunk) {
        strdat += chunk;
    });
	req.on('end', function()
	{
	    var data = JSON.parse(strdat);
		var cryp = crypto.createHash('sha512');
		var text = `${process.env.PAYU_MERCHANT_SALT_VERSION_1}|` + data.status + '||||||' + data.udf5 +'|||||'+ data.email + '|' + data.fname + '|' + data.pinfo + '|' + data.amount + '|' + data.txnid +`|${process.env.PAYU_MERCHANT_KEY}`;
		cryp.update(text);
		var hash = cryp.digest('hex');		
		res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(hash);		
	});
});






// // old code ---
// router.post('/payment_gateway', (req, res) => {
//     // function makeid() {
//     //     var text = "";
//     //     var possible = "0123456789";

//     //     for (var i = 0; i < 10; i++)
//     //         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     //     return text;
//     // }

//     // const data = makeid();
//     // const start = req.body;
//     // console.log(start);

//     //Here save all the details in pay object 

//     // const pay = payment({
//     //     firstname: req.body.firstname,
//     //     txnid: data,
//     //     email: req.body.email,
//     //     amount: req.body.amount,
//     //     productinfo: req.body.productinfo,
//     //     payment_status: req.body.payment_status,
//     //     phone: req.body.phone,
//     // });
//     const pay=req.body

//     // pay.save()

//     const hashString = 'gtKFFx' //store in in different file
//         + '|' + pay.txnid
//         + '|' + pay.amount
//         + '|' + pay.productinfo
//         + '|' + pay.firstname
//         + '|' + pay.email
//         + '|' + '||||||||||'
//         + '4R38lvwiV57wVpsgOvTXBdLE4tHUXFW' //store in in different file

//     const sha = new jsSHA('SHA-512', "TEXT");

//     sha.update(hashString);

//     //Getting hashed value from sha module
//     const hash = sha.getHash("HEX");
//     console.log(hash);
//     //We have to additionally pass merchant key to API
//     //  so remember to include it.
//     pay.key = 'gtKFFx' //store in in different file; 
//     pay.surl = 'http://localhost:5005/payment/success';
//     pay.furl = 'http://localhost:5005/payment/fail';
//     pay.hash = hash;

//     //Making an HTTP/HTTPS call with request
//     request.post({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data'
//         },
//         url: 'https://test.payu.in/_payment', //Testing url
//         form: pay
//     }, function (error, httpRes, body) {

//         if (error)
//             res.send(
//                 {
//                     status: false,
//                     message: error.toString()
//                 }
//             );

//         if (httpRes.statusCode === 200) {

//             res.send(body);
//         } else if (httpRes.statusCode >= 300 &&
//             httpRes.statusCode <= 400) {
//             res.redirect(httpRes.headers.location.toString());
//         }
//     })
// });



// router.post('/payment/success', (req, res) => {

//     //Payumoney will send Success Transaction data to req body. 
//     //  Based on the response Implement UI as per you want

//     res.send(req.body);
//     console.log("success");

// });

// router.post('/payment/fail', (req, res) => {

//     //Payumoney will send Fail Transaction data to req body. 
//     //  Based on the response Implement UI as per you want
//     res.send(req.body);
//     console.log("failed");

// })



// router.post('/money',async(req,res)=>{
// //  {
// //         if (!req.body.txnid || !req.body.amount || !req.body.productinfo   
// //              || !req.body.firstname || !req.body.email) {
// //                res.send("Mandatory fields missing");
// //          } else {
// //                var pd = req.body;
// //                var hashString = "gtKFFx" // Merchant Key 
// //                         + '|' + pd.txnid 
// //                         + '|' + pd.amount + '|' + pd.productinfo + '|'          
// //                         + pd.firstname + '|' + pd.email + '|' 
// //                         + '||||||||||' 
// //                         + "4R38lvwiV57wVpsgOvTXBdLE4tHUXFW" // Your salt value
// //                var sha = new jsSHA('SHA-512', "TEXT");
// //                sha.update(hashString)
// //                var hash = sha.getHash("HEX");
// //                res.send({ 'hash': hash });
// //          }
// //       }

// var pd = req.body;
// //Generate new Hash 
//  var hashString = "4R38lvwiV57wVpsgOvTXBdLE4tHUXFW" + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + "gtKFFx"
//  var sha = new jsSHA('SHA-512', "TEXT");
//  sha.update(hashString)
//  var hash = sha.getHash("HEX");
//  // Verify the new hash with the hash value in response
//  if (hash == pd.hash) {
//      res.send({'status':pd.status});
//  } else {
//      res.send({'status':"Error occured"});
//  }
// }
// //     // payumoney()
// //         //Create a Data object that is to be passed to LAUNCH method of Bolt
// //         //   var pd = {
// //         //      key:"gtKFFx" ,/*** Merchant key from PayuMoney Dashboard ***/
// //         //      txnid:"", /*** Unique Transaction ID***/
// //         //      amount:"", /*** Amount to be paid ***/
// //         //      firstname:"", /*** Name of the User ***/
// //         //      email: "",/** Email Id of User **/
// //         //      phone:"", /** Mobile number of User **/
// //         //      productinfo: "",/* Product name */
// //         //      surl:"", /* Success callback URL */
// //         //      furl:"", /* Failure callback URL */
// //         //      hash: ''
// //         // }

// //         var pd=req.body;
        
// //         // Data to be Sent to API to generate hash.
// //         let data = {
// //             'txnid': pd.txnid,
// //             'email': pd.email,
// //             'amount': pd.amount,
// //             'productinfo': pd.productinfo,
// //             'firstname': pd.firstname
// //         }
// //         let self = this;
// //         // API call to get the Hash value

        
// )



module.exports = router;