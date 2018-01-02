
module.exports =  function(app){
	var firebase = require("firebase");
	var admin = require("firebase-admin");
	var bodyParser= require('body-Parser');

	var serviceAccount = require("../config/service.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://docm-cd739.firebaseio.com"
	});
	var db = admin.firestore();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

		//LANDNG PAGE
			// POST method route to the profile setup page
		app.post('/api/profile', function (req, res) {

			var docRef = db.collection('groups').doc(req.body.username);
			var groupExist = docRef.get()
			.then(doc => {
		        if (doc.exists) {
					res.send("User already exist. Please change username.")
				}else{
					var setGroup = docRef.set({
					'groupUsername': req.body.username,
					'fullName': req.body.fullName,
					'email': req.body.email,
					'password':  req.body.password,
					'address':  req.body.address,
					'timestamp': Date.now(),
					'users': {}

					})
					firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
					 // Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					  if (error) console.log(errorMessage)
					});
				res.send("Success");	
				}
		    }) 

		});

		///ERROR: U HAVE TOO CLICK ON SIGNIN TWICE TO GET A SUSCEESSFUL LOGIN
		//LOGIN PAGE
		// POST method route to the homepage
		app.post('/api/login', function (req, res) {
			firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // ...
			  if (error) console.log(error.message)
			});
			var user = firebase.auth().currentUser;
			res.send("Login Process")
		  
		});


		//LOGOUT PAGE
		// GET method to sign out page
		app.get('/api/logout/', function (req, res) {
			var user = firebase.auth().currentUser;
			if (user) {
			  // User is signed in.
			  	firebase.auth().signOut().then(function() {
					  // Sign-out successful.
					}).catch(function(error) {
					  // An error happened.
				  if(error) console.log(error.message);
				});
			res.send('user has signed out');
			} else {
			  // No user is signed in.
			  res.send('Not a user');
			}

		})

}
