const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingsSchema = new Schema({
    b_phone_number: {
        type:String,
        required: true
    },
    b_amount: {
        type: String,
        required: false
    },
    gst_amount: {
        type: String,
        required: false
    },
    b_status: {
        type: String,
        required: false
    },
    customer_id: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const Bookings = mongoose.model('Bookings', BookingsSchema);
module.exports = Bookings;
