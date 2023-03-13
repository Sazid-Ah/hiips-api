const mongoose=require('mongoose');
const mongoURI="mongodb+srv://sazid:1234@cluster0.mlq5qbu.mongodb.net/hiips?retryWrites=true&w=majority" 

// mongodb://localhost:27017/ags?directConnection=true

const connectTomongo=()=>{

mongoose.connect(mongoURI,()=>{
    console.log("Connected to Mongo Successfully");
});

}
module.exports=connectTomongo;  

