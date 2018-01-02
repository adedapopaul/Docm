


// module.exports = function(app){
// var firebase= require('firebase');
// 	var admin = require("firebase-admin");
// 	var serviceAccount = require("./service.json");
// 	var bodyParser= require('body-Parser');

// 	admin.initializeApp({
// 	  credential: admin.credential.cert(serviceAccount),
// 	  databaseURL: "https://docm-cd739.firebaseio.com"
// 	});
// 	var db = admin.firestore();
// 		app.use(bodyParser.json());
// 	app.use(bodyParser.urlencoded({extended: true}));


// 	// POST method route to the profile setup page
// 		app.post('/api/profile', function (req, res) {

// 			//first create account
// 			var docRef = db.collection('groups').doc(req.body.username);

// 				var setAda = docRef.set({
// 			    'username': req.body.username,
// 			    'fullName': req.body.fullName,
// 			    'email': req.body.email,
// 			    'password':  req.body.password,
// 			    'address':  req.body.address

// 			})
// 				res.send("Success");
// 		})


// }