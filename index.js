const express = require('express');
const app = express()
const connectTomongo=require('./Config/db');
require('dotenv').config()

app.use(express.json());
app.use(express.static("./static/uploads/images"));
connectTomongo();
// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }));


const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000']
}));
 


app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/facilitators',require('./routes/facilitators'));
app.use('/api/serviceprovider',require('./routes/service_provider'));
app.use('/api/category',require('./routes/category'));
app.use('/api/bookings',require('./routes/bookings'));
app.use('/api/payments',require('./routes/payments'));
app.use('/api/address',require('./routes/address'));
app.use('/api/services',require('./routes/services'));
app.use('/api/service_types',require('./routes/service_types'));
app.use('/api/sub_services',require('./routes/sub_services'));
app.use('/api/community',require('./routes/community'));
app.use('/api/communityrequest',require('./routes/communityRequest'));
app.use('/api/block',require('./routes/block'));
app.use('/api/apartment',require('./routes/apartment'));
app.use('/api/flat',require('./routes/flat'));
app.use('/api/pricing',require('./routes/pricing'));
app.use('/api/service_duration',require('./routes/service_duration'));
app.use('/api/flat_type',require('./routes/flat_type'));
app.use('/api/payment',require('./routes/payumoney'));
app.use('/api/attendance',require('./routes/attendance'));
app.use('/api/pay',require('./routes/app'));
app.use('/api/coupon',require('./routes/coupon'));





app.get('/About', (req, res) => {
  res.send('Hello how are you');
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});
