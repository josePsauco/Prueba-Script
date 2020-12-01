var express = require('express');
var morgan = require('morgan');
var corsa = require('cors');  
var mysql = require('mysql');
var path = require('path');
var myConnection = require('express-myconnection');
var app = express();
// importing routes
var fotosRouter = require('./routes/routefotos');
 function main(){
   app.listen(4000);
    app.use(morgan('dev'));
    app.use(corsa());
    app.use('/storage',express.static(path.join(__dirname, '/storage')));
    app.use(express.urlencoded({extended: false}));
    app.use('/', fotosRouter);
    console.log(4000);
  
}
main();


