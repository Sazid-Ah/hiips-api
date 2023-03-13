const mongoose = require('mongoose');
const { Schema } = mongoose;

const  booking_Service_schema = new Schema({
    booking_id:{ type:String, ref: 'bookings' },
    service_id:{
        type: String,
        required: false 
    },
    service_name:{
        type: String,
        required: false, 
    },
    service_duration_id:{
        type: String,
        required: false, 
    },
    service_duration_title:{
        type: String,
        required: false, 
    },
    price:{
        type: String,
        required: false, 
    },
    total_price:{
        type: String,
        required: false, 
    },
    start_date:{
        type: String,
        required: false, 
    },
    preferred_time:{
        type: String,
        required: false, 
    },
    community_id:{
        type: String,
        required: false, 
    },
    community_name:{
        type: String,
        required: false, 
    },
    block_id:{
        type: String,
        required: false, 
    },
    block_name:{
        type: String,
        required: false, 
    },
    flat_type_id:{
        type:String,
        required: false
    },
    flat_type_name:{
        type:String,
        required: false
    },
    flat_number:{
        type: String,
        required: false, 
    },
    first_name:{
        type: String,
        required: false, 
    },
    last_name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false 
    },
    mobile_number:{
        type:String,
        required: false
    },
    maid_id:{
        type: String,
        required: false
    },
    maid_name:{
        type: String,
        required: false
    },
    booking_services_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const booking_Service = mongoose.model('booking_Service', booking_Service_schema);
module.exports=booking_Service;
