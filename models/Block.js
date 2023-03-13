const mongoose = require('mongoose');
const { Schema } = mongoose;

const  BlockSchema = new Schema({
    block_name:{
        type: String,
        required:false
    },
    block_description:{
        type: String,
        required: false 
    },
    community_id:{
        type: String,
        required: false, 
    },
    community_name:{
        type: String,
        required: false, 
    },
    block_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Block = mongoose.model('block', BlockSchema);
module.exports=Block;
