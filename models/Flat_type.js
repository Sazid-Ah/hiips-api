const mongoose = require('mongoose');
const { Schema } = mongoose;

const  Flat_type_Schema = new Schema({
    flat_type_title:{
        type: String,
        required: true 
    },
    flat_type_id:{
        type: String,
        required:false
    },
    community_id:{
        type: String,
        required: true
    },
    community_name:{
        type: String,
        required:true
    },
    flat_area:{
        type: String,
        required:true
    },
    flat_type_status:{
        type: String,
        required: true
    },
    maid_service_price:{
        type: String,
        required: true
    },
    deep_cleaning_price:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Flat_type = mongoose.model('Flat_type', Flat_type_Schema);
module.exports=Flat_type;
