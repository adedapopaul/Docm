var express = require('express');
var pageApi = require('./controllers/pageApi');
var usersApi = require('./controllers/usersApi');
var adminConfig= require('./config/adminConfig');
var firebaseMe = require('./config/firebaseConfig');
var firebase = require("firebase");
// var database = firebase.database();
var app = express();
var port= 3000 || process.env.PORT;

app.use('/assets', express.static(__dirname + 'public'));
app.set('view engine',  'jade');

pageApi(app);
usersApi(app);
adminConfig(app);
firebaseMe(app);
app.listen(port, function () {
  console.log('App is listening on ' + port)
})