const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name:{
        type: String,
        required: false
    },
    last_name:{
        type: String,
        required: false
    },
    user_email:{
        type: String,
        required: false
    },
    user_mobile_number:{
        type: Number,
        required: false
    },
    user_otp:{
        type:String,
        required:false
    },
    user_image: {
        data:Buffer,
        contentType:String
      },
    user_date:{
        type: Date,
        default: Date.now
    },
  });
  
  const User = mongoose.model('user', UserSchema);
  module.exports = User;

  


