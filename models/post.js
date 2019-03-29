var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    _author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        text:String,
        _author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model("Post",PostSchema);