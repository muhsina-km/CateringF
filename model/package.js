const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://catering:catering@cluster0.xz4ni0q.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => { console.log("DB connected") })
    .catch(err => console.log(err));

let pl = mongoose.Schema;
const packagedetailsschema = new pl({
    packid: String,
    packname: String,
    pprice: Number,
   
    pdescription: String,
    status:String,
    image:{
        data:Buffer,
        contentType:String,
    }
});

var packagedetailsmodel = mongoose.model("Package", packagedetailsschema)
module.exports = packagedetailsmodel;