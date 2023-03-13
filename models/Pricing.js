const mongoose = require('mongoose');
const { Schema } = mongoose;

const  PricingSchema = new Schema({
    community_id:{
        type: String,
        required:false
    },
    service_id:{
        type: String,
        required: false 
    },
    duration_id:{
        type: String,
        required: false, 
    },
    duration_title:{
        type: String,
        required: false, 
    },
    price:{
        type: String,
        required: false, 
    },
    pricing_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Pricing = mongoose.model('Pricing', PricingSchema);
module.exports=Pricing;
