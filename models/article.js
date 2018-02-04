let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tag:{
        type:Array,
        required:false
    },
    body:{
        type:String,
        required:true
    }
});

let Article = module.exports = mongoose.model('Article',articleSchema);