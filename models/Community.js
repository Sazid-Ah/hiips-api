const mongoose = require('mongoose');
const { Schema } = mongoose;

const  CommunitySchema = new Schema({
    community_name:{
        type: String,
        required:false
    },
    community_description:{
        type: String,
        required:false, 
    },
    community_address_line_1:{
        type: String,
        required: false, 
    },
    community_address_line_2:{
        type: String,
        required: false, 
    },
    community_landmark:{
        type: String,
        required: false, 
    },
    community_city:{
        type: String,
        required: false, 
    },
    community_state:{
        type: String,
        required: false, 
    },
    community_pincode:{
        type: String,
        required: false, 
    },
    community_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Community = mongoose.model('community', CommunitySchema);
module.exports=Community;
