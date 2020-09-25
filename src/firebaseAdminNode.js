var firebaseAdmin = require('firebase-admin');

function FirebaseAdminNode(config) {
  if (!config.serviceAccountJson){
    throw 'Service Account Json Not Present';
  }

  this.app = firebaseAdmin.initializeApp({
	  credential: firebaseAdmin.credential.cert(config.serviceAccountJson)
	});

	this._firebaseAdmin = firebaseAdmin;
	this.messaging = firebaseAdmin.messaging();
}

FirebaseAdminNode.prototype.onClose = function(removed, done) {
	let deletePromises = [];
	firebaseAdmin.apps.forEach((app) => {
    deletePromises.push(app.delete());
  });
  Promise.all(deletePromises)
  .then(()=>{
 		done()
 	})
 	.catch((e)=>{
  	console.error(e)
 		done()
 });
};

module.exports = FirebaseAdminNode