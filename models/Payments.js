const mongoose = require('mongoose');
const { Schema } = mongoose;

const  PaymentsSchema = new Schema({
    p_customer_name:{
        type: String,
        required:true
    },
    p_worker_name:{
        type: String,
        required: false, 
    },
    p_product_service:{
        type: String,
        required: true, 
    },
    p_payment_method:{
        type: String,
        required: true, 
    },
    p_status:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Payments = mongoose.model('Payments', PaymentsSchema);
module.exports=Payments;


