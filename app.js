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
    let articles = [
        {
            id:1,
            title:'helo world',
            author:'ahmedmurtaza',
            body:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
        },
        {
            id:1,
            title:'helo world',
            author:'ahmedmurtaza',
            body:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
        },
        {
            id:1,
            title:'helo world',
            author:'ahmedmurtaza',
            body:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
        }
    ]
    res.render('index',{
        title:'Node + Express lesson',
        heading: 'Articles',
        articles
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