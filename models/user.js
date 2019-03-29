var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    url: String
})

var UserSchema = new mongoose.Schema({
    name:String,
    images: [ImageSchema]
});

module.exports = mongoose.model("User",UserSchema)