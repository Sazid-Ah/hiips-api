const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone_number:{
        type:String,
        required: true
    },
    community_id:{
        type:String,
        required: true
    },
    block_id:{
        type:String,
        required: true
    },
    flat_type_id:{
        type:String,
        required: true
    },
    flat_id:{
        type:String,
        required: true
    },
    email_address:{
        type: String,
        required: true
    },
    house_number:{
        type: Number,
        required: false
    },
    street_name:{
        type:String,
        required: false
    },
    area:{
        type:String,
        required: false
    },
    city:{
        type:String,
        required: false
    },
    pin_code:{
        type: Number,
        required: false
    },
    address_type:{
        type:String,
        required:false
    },
    user_date:{
        type: Date,
        default: Date.now
    },
  });
  const Address = mongoose.model('Customers_Address', AddressSchema);
  module.exports = Address;
