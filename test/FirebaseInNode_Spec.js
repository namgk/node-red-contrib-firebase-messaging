const FirebaseAdminNode = require('node-red-contrib-firebase-admin-config');
const assert = require('assert');

const FirebaseInNode = require('../src/firebaseInNode');
const serviceAccountJson = require('../my-firebase-service-credential.json');

describe('FirebaseInNode', function() {
  it('Fail without admin', function() {
  	try {
	  	new FirebaseInNode({});
	  	assert.fail()
  	} catch (e){}
  });
});
