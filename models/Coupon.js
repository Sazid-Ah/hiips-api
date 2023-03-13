const mongoose = require("mongoose");
const { Schema } = mongoose;

const CouponsSchema = new Schema({
    discount_type: {
        type: String,
        require: false,
    },
    coupon_code: {
        type: String,
        require: false,
    },
    date_expired:{
        type:String,
        require: false,
    },
    discount_amount:{
        type:String,
        require: false,
    },
    date_created: {
        type:String,
        require: false,
    },
    status:{
        type: Number,
        require: false,
    },
    date:{
        type: Date,
        default: Date.now
    },
});
const Coupon = mongoose.model("Coupon", CouponsSchema);
module.exports = Coupon;
