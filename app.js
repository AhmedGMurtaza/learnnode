const express = require('express');
const path = require('path');

// init app
const app = express();

// load view engine
// __dirname refers to current directory
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// home route
app.get('/',function(req,res){
    res.render('index',{
        title: 'Node + Express lesson'
    });
})

app.get('/articles/add',function(req,res){
    res.render('add_article',{
        heading:'Add article'
    })
})

app.listen('3000',function(){
    console.log('listening to port 3000');
})