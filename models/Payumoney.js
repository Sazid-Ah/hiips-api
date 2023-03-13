const mongoose = require('mongoose');
const { Schema } = mongoose;

const  PaymentsSchema = new Schema({
    firstname:{
        type: String,
        required:false
    },
    txnid:{
        type: String,
        required:false
    },
    email:{
        type: String,
        required:false, 
    },
    amount:{
        type: String,
        required: false, 
    },
    productinfo:{
        type: String,
        required: false, 
    },
    phone:{
        type: String,
        required: false, 
    },
    payment_status:{
        type: String,
        required:false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Payments = mongoose.model('PayuMoney', PaymentsSchema);
module.exports=Payments;


