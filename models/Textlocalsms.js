const axios =require( 'axios');

const apiKey = "NTk0YTY0MzY2YjYxMzE0NjQ4NDY3MTM0NGU1NDRkNGU" 
const sender = "api.textlocal.in"
const number = "916306862226"
let applicationName = "application name"
let otp = "123123"
const message = encodeURIComponent(`Welcome to ${applicationName}, Your OTP is ${otp}. Thanks Doosy`);

var url = "http://api.textlocal.in/send/?" + 'apiKey=' + apiKey + '&sender=' + sender + '&numbers=' + number + '&message=' + message

const sendSms = async (req, res) => {
    axios
        .post(url)
        .then(function (response) {
            console.log("response ", response.data);
        })
        .catch(function (error) {
            console.log("error ", error.message);
        });
}

module.exports=sendSms