var express = require('express');
var app = express();

var ejs = require('ejs');
app.set('views','./views');
app.set('view engine','ejs');

var fs = require('fs');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

//port setting
app.set('port', process.env.PORT || 8080);

//mariadb setting
var mysql = require('mysql');

var conn = mysql.createConnection({
    host :'localhost',
    user :'root',
    password:'7733',  
    database:'testdb'
});

//query statement
var stmt_output ='select * from user';  
//db_out_array
var query_output ;

//db_out_array
conn.query(stmt_output,function(err,rows,fields){
    if(!err){
        console.log('db output');
        query_output = rows;
        console.log(query_output);
    }else{
        console.log('db output error',err);
    };

});

//db_input_statement
app.get('/output',function(req,res){
    res.render('output',{query_output:query_output});
});


//query_input statement
var stmt_input ='select * from user';  
//db_out_array
var query_input ;

//db_out_array
conn.query(stmt_input,function(err,rows,fields){
    if(!err){
        console.log('db input');
        query_input = rows;
        //console.log는 로그파일에 기록하는 것으로 대체
        console.log(query_input);
    }else{
        console.log('db input error',err);
    };

});

app.post('/input',function(req,res){
    res.render('input',{query_input:query_input});
});
//app.get//////////////////////////////////////////////////////

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
app.listen(app.get('port'),function(){
    console.log('starting server '+app.get('port')+' port');
}); 