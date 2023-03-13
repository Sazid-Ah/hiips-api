const mongoose = require('mongoose');
const { Schema } = mongoose;

const  ApartmentSchema = new Schema({
    apartment_name:{
        type: String,
        required:false
    },
    apartment_description:{
        type: String,
        required: false 
    },
    block_id:{
        type: String,
        required: false, 
    },
    apartment_status:{
        type: String,
        required: false, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const Apartment = mongoose.model('apartment', ApartmentSchema);
module.exports=Apartment;
