var express = require('express');
var app = express();

var ejs = require('ejs');
app.set('views','./views');
app.set('view engine','ejs');

var fs = require('fs');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host :'localhost',
//     user :'root',
//     password:'7733',
//     database:'testdb'
// });

// con.connect();


//app.get//////////////////////////////////////////////////////


app.get ('/',function(req,res){
    console.log('test root');
    res.render('home.ejs');
})
app.get('/menu',function(req,res){
    
        console.log('success!!!');

        //res.send('success!');
        res.render('menu.ejs');
    
});
//app.post//////////////////////////////////////////////
app.post('/body',function(req,res){
    console.log('body print');
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title,description,function(err){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send('success03');
        }
    });
});
//var destinationfiles;  
var testObject = null;
app.get('/menu/:id',function(req,res){
    var id = req.params.id;
    fs.readdir('data',function(err,files){
        testObject = files;
        if(err){
            console.log(err);
            res.statusCode(500).send('Internal err');
        }else{
            console.log("success!!!");
            res.render('body',{numbers : testObject});
        }
    });
});

//app.listen port setting
app.listen(3000,function(){
    console.log('start server 3000 port');
});