const mongoose = require('mongoose');
const { Schema } = mongoose;

const  ServicesSchema = new Schema({
    service_name:{
        type: String,
        required: true, 
    },
    service_type_id:{
        type:String,
        required:true
    },
    service_status:{
        type: String,
        required: true, 
    },
    service_description:{
        type: String,
        required: true, 
    },
    service_is_itself:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Services = mongoose.model('Services', ServicesSchema);
module.exports=Services;
