const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

// Body parser Middleware
// it will be used to parse request body
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

//for statc pages (non templates/non rendered)
app.use(express.static(path.join(__dirname,'public')))

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

// get single article
app.get('/article/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        res.render('article',{
            article:article
        })
    }) 
})

// edit article route
app.get('/article/edit/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        res.render('edit_article',{
            article:article,
            heading:'Edit'
        })
    })
})

// Add submit POST route
app.post('/articles/add',function(req,res){
    let article = new Article();
    article.title = req.body.title;
    article.body = req.body.body;
    article.author = req.body.author;
    article.save(function(err){
        if(!err){
            res.redirect('/');
            console.log('redirected!');
        }
        else{
            console.log(err);
            return;
        }
    })
})

app.listen('3000',function(){
    console.log('listening to port 3000');
})