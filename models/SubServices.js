const mongoose = require('mongoose');
const { Schema } = mongoose;

const  SubServicesSchema = new Schema({
    sub_service_name:{
        type: String,
        required: true, 
    },
    service_id:{
        type:String,
        required:true
    },
    sub_service_status:{
        type: String,
        required: true, 
    },
    sub_service_description:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const SubServices = mongoose.model('SubServices', SubServicesSchema);
module.exports=SubServices;
