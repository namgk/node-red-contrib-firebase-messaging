const FirebaseAdminNode = require('../src/firebaseAdminNode');
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
