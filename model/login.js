const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://catering:catering@cluster0.xz4ni0q.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{console.log("DB connected")
})
.catch(err=>console.log(err));

const loginSchema = new mongoose.Schema({
    username : String,
    password : String,
});

const loginModel = mongoose.model('login',loginSchema);

module.exports = loginModel;