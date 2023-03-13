const mongoose = require('mongoose');
const { Schema } = mongoose;

const  ServicesSchema = new Schema({
    category_id:{
        type: String,
        required: true
    },
    service_type_name:{
        type: String,
        required: true 
    },
    service_type_description:{
        type: String,
        required: true
    },
    service_type_status:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Service_types = mongoose.model('Service_types', ServicesSchema);
module.exports=Service_types;
