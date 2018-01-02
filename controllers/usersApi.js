
module.exports =  function(app){
	var firebase= require("firebase");
	var admin = require("firebase-admin");
	var bodyParser= require('body-Parser');
	var db = admin.firestore();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	//Account set up
	app.post('/api/user/setup', function (req, res) {
		var  email = req.body.email;
		var password= req.body.password;
		var fullName= req.body.fullName
		var group = db.collection('groups').doc(req.body.groupUsername);
		//set user reference
		var user = db.collection('users').doc(req.body.username);

		//check if the user exist
		 user.get().then(doc => {
			        if (doc.exists) {console.log("user already exist")}
			        	else{
						var setUser = user.set({
							'groupUsername': groupUsername,
							'username': req.body.username,
							'fullName': req.body.fullName,
							'email': req.body.email,
							'password':  req.body.password,
							'address':  req.body.address,
							'timestamp': Date.now()
						})
				}
			})

		//check if the group exist
			var groupExist = group.get()
			.then(doc => {
		        if (doc.exists) {
		        	// group.update({ users : username}, { merge: true });

					//create the account if group exist
					firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
					 // Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					  if (error) console.log(errorMessage)
					});
					res.send("Account Successfully created");
				}else{
					res.send('User has to be registered under a group')
				}
						
			})
	}) 

						

	//User's profiile
	app.post('/api/user/update', function (req, res) {
		var user = firebase.auth().currentUser;
		var newPassword = req.body.password;
		var newEmail = req.body.email;
		// var group = db.collection('groups').doc(req.body.groupUsername);
		// //set user reference
		// var user = db.collection('users').doc(req.body.username);
		if (user) { 
			user.updateEmail(newEmail).then(function() {
				  // Update successful.
				}).catch(function(error) {
				  // An error happened.
				  if(error) console.log(error.message);
				});

			user.updatePassword(newPassword).then(function() {
			  // Update successful.
			}).catch(function(error) {
			  // An error happened.
			  if(error) console.log(error.message);
			});

		// 	//check if the group exist
		// 	var groupExist = group.get()
		// 	.then(doc => {
		//         if (doc.exists) {
		//         	group.update({ password : newPassword}, {email: newEmail}, { merge: true });

		// 		}		
		// 	})

		// 	//check if the user exist
		// 	var userExist = user.get()
		// 	.then(doc => {
		//         if (doc.exists) {
		//         	user.update({ password : newPassword}, {email: newEmail}, { merge: true });

		// 		}		
		// 	})

			res.send('Update successful')
		}else{
			res.send('Not a user');
		}


	})

	////DELETE USER
	app.delete('/api/user', function(req, res){
		var user = firebase.auth().currentUser;
		if (user){
			user.delete().then(function() {
		 	 // User deleted.
			}).catch(function(error) {
			  // An error happened.
			  if (error) throw error.message;
			});	
		
			res.send('user successfully deleted');
		}else{
			res.send('Not a user');
		}
	});

	////ADMIN APIs

	//GET USER BY ID
		app.post('/api/admin/:uid', function(req, res){
			admin.auth().getUser(req.params.uid)
			  .then(function(userRecord) {
			    // See the UserRecord reference doc for the contents of userRecord.
			   var userRecord = userRecord.toJSON();
			    console.log("Successfully fetched user data:", userRecord.toJSON());
			    res.send(userRecord);
			  })
			  .catch(function(error) {
			    console.log("Error fetching user data:", error);
			 });
		});
		//GET USER BY EMAIL
		app.post('/api/admin/:email', function(req, res){
			admin.auth().getUserByEmail(req.params.email)
			  .then(function(userRecord) {
			    // See the UserRecord reference doc for the contents of userRecord.
			   var userRecord = userRecord.toJSON();
			    console.log("Successfully fetched user data:", userRecord.toJSON());

			  })
			  .catch(function(error) {
			    console.log("Error fetching user data:", error);
			 });
			res.send(userRecord);
		});
		//GET USER BY PHONE NUMBER
		app.post('/api/admin/:phoneNumber', function(req, res){
			admin.auth().getUserByPhoneNumber(req.params.phoneNumber)
			  .then(function(userRecord) {
			    // See the UserRecord reference doc for the contents of userRecord.
			   var userRecord = userRecord.toJSON()
			    console.log("Successfully fetched user data:", userRecord.toJSON());
			    res.send(userRecord);
			  })
			  .catch(function(error) {
			    console.log("Error fetching user data:", error);
			 });
		});



}