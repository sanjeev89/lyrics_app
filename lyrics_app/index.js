var express = require('express');

var bodyparser=require('body-parser');
var route = require('./route/route.js');
var path = require('path');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
 
app.use(bodyparser.json());
app.use('/', route);

app.listen(3001,function(){
    console.log('server started on port 3001...');
});