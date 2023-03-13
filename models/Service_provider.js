const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceproviderSchema = new Schema({
    name:{
        type: String,
        required: false
    },
    age:{
        type:Number,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    email_id:{
        type:String,
        required:false
    },
    skillset:{
        type:String,
        required:false
    },
    blood_group:{
        type:String,
        required:false
    },
    experience:{
        type:Number,
        required:false
    },
    maid_image:{
        type:String,
        required:false
    },
    date_of_joining:{
        type:String,
        required:false
    },
    date_of_exit:{
        type:String,
        required:false
    },
   date_of_birth:{
        type:String,
        required:false
    },
   education:{
        type:String,
        required:false
    },
   active:{
        type:Number,
        required:false
    },
    covid_vaccination:{
        type:Boolean,
        required:false
    },
    esi_number:{
        type:String,
        required:false
    },
    pf_number:{
        type:String,
        required:false
    },
    emergency_contact_number:{
        type:Number,
        required:false
    },
    alternative_phone_number:{
        type:Number,
        required:false
    },
    nearst_police_station:{
        type:String,
        required:false
    },
    designation:{
        type:String,
        required:false
    },
    pan_card_number:{
        type:String,
        required:false
    },
    employee_id:{
        type:String,
        required:false
    },
    is_police_verified:{
        type: Number,
        required:false
    },
    adhar_number:{
        type: Number,
        required:false
    },
    father_spouse_name:{
        type:String,
        required:false
    },
    phone_number:{
        type:Number,
        required:false
    },
    father_spouse_number:{
        type:Number,
        required: false
    },
    reference_1_type_name:{
        type:String,
        required:false
    } ,
     reference_1_type_number:{
        type:Number,
        required:false
    } ,
    reference_2_type_name:{
        type:String,
        required:false
    } ,
   reference_2_type_number:{
       type:Number,
       required:false
   },
    address_line_1:{
        type:String,
        required: false
    },
    address_line_2:{
        type:String,
        required: false
    },
    landmark:{
        type:String,
        required: false
    },
    city:{
        type:String,
        required: false
    },
    zip_or_postal_code:{
        type:String,
        required: false
    },
    state:{
        type:String,
        required: false
    },
    account_number:{
        type:Number,
        required: false
    },
    bank_name:{
        type:String,
        required: false
    },
    account_holder_name:{
        type:String,
        required:false
    },
    ifsc_code:{
        type:String,
        required: false
    },
    branch:{
        type:String,
        required: false
    },
    covid_vaccination_1:{
        type:Number,
        required: false
    },
    covid_vaccination_2:{
        type:Number,
        required: false
    },
    covid_vaccination_booster:{
        type:Number,
        required: false
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const serviceprovider = mongoose.model('serviceprovider', serviceproviderSchema);
  module.exports = serviceprovider;


