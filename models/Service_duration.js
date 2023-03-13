const mongoose = require('mongoose');
const { Schema } = mongoose;

const  Service_Duration_Schema = new Schema({
    duration_id:{
        type: String,
        required: false 
    },
    duration_title:{
        type: String,
        required: false, 
    },
    duration_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Service_Duration = mongoose.model('Service_Duration', Service_Duration_Schema);
module.exports=Service_Duration;
