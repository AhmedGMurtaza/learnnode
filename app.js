const express = require('express');
const path = require('path');
//mongoose let us connect with mongodb  
const mongoose = require('mongoose'); 

/* db configuraton started */
mongoose.connect('mongodb://localhost/nodedb');
let db = mongoose.connection;

// check db connection
db.on('error',function(err){
    console.log(err);
})
db.once('open',function(){
    console.log('connected to mongodb');
})
/* db configuraton ended */

// init app
const app = express();

// load view engine
// __dirname refers to current directory
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Injecting Models
let Article = require('./models/article');

// home route
app.get('/',function(req,res){
    let articles = Article.find({},function(err, articles){
        if(!err){
            res.render('index',{
                title:'Articles',
                articles
            });
        }
        else{
            console.log('Error: '+err);
        }
    });
})

app.get('/articles/add',function(req,res){
    res.render('add_article',{
        heading:'Add Article'
    })
})

app.listen('3000',function(){
    console.log('listening to port 3000');
})