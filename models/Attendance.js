const mongoose = require('mongoose');
const { Schema } = mongoose;

const  AttendenceSchema = new Schema({
    maid_id:{
        type: Number,
        required:false
    },
    maid_emp_id:{
        type: String,
        required: false 
    },
    maid_name:{
        type: String,
        required: false, 
    },
    if_on_leave:{
        type: Boolean,
        required: false
    },
    alternate_maid_id:{
        type: Number,
        required:false
    },
    alternate_maid_emp_id:{
        type: String,
        required: false 
    },
    alternate_maid_name:{
        type: String,
        required: false, 
    },
    booking_id:{
        type: Number,
        required: false, 
    },
    flat_id:{
        type:Number,
        required: false, 
    },
    service_date:{
        type: Date,
        required: false, 
    },
    service_time:{
        type: String,
        required: false, 
    },
    is_feedback_submitted:{
        type: String,
        required: false, 
    },
    feedback:{
        type: String,
        required: false, 
    },
    feedback_type:{
        type: String,
        required: false, 
    },
    response:{
        type:String,
        required:false, 
    },
    response_date:{
        type: Date,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Attendence = mongoose.model('Attendence', AttendenceSchema);
module.exports=Attendence;
