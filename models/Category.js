const mongoose = require('mongoose');
const { Schema } = mongoose;

const  CategorySchema = new Schema({
    category_name:{
        type: String,
        required:false
    },
    category_short_description:{
        type: String,
        required:false
    },
    category_description:{
        type:String,
        required: false
    },
    category_image:{
        type: String,
        required:false
    },
    display_order:{
        type:String,
        required:false
    },
    category_status:{
        type: String,
        required: false 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  

const Category = mongoose.model('Category', CategorySchema);
module.exports=Category;
