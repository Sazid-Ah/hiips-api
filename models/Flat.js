const mongoose = require('mongoose');
const { Schema } = mongoose;

const  FlatSchema = new Schema({
    flat_number:{
        type: String,
        required:false
    },
    flat_type:{
        type: String,
        required: false 
    },
    block_id:{
        type: String,
        required: false, 
    },
    block:{
        type: String,
        required: false, 
    },
    community:{
        type: String,
        required: false, 
    },
    flat_status:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Flat = mongoose.model('flat', FlatSchema);
module.exports=Flat;
