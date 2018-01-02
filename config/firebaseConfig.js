
module.exports = function(app){
	var firebase = require("firebase");
	// var database = firebase.database();
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPbfhQQN3MqrE1jGm_Oc4FVmy37DgyJLo",
    authDomain: "docm-cd739.firebaseapp.com",
    databaseURL: "https://docm-cd739.firebaseio.com",
    projectId: "docm-cd739",
    storageBucket: "docm-cd739.appspot.com",
    messagingSenderId: "896403144148"
  };
  firebase.initializeApp(config);
  var database = firebase.database()
}

