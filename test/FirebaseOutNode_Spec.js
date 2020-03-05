const FirebaseAdminNode = require('../src/firebaseAdminNode');
const assert = require('assert');

const FirebaseOutNode = require('../src/firebaseOutNode');
const serviceAccountJson = require('../my-firebase-service-credential.json');

describe('FirebaseOutNode', function() {
  it('Fail without admin', function() {
  	try {
	  	new FirebaseOutNode({});
	  	assert.fail()
  	} catch (e){}
  });

  it('Can send cloud messaging', function(done) {
    this.timeout(3000);

    const firebaseAdminNode = new FirebaseAdminNode({
      serviceAccountJson: serviceAccountJson
    });

    const firebaseOutNode = new FirebaseOutNode({
      admin: firebaseAdminNode
    });

    const topic = "atopic"
    const title = "atitle"
    const content = "acontent";

    firebaseOutNode.onInput({
      payload: { title, "body": content },
      topic
    }, d => {
      assert(d.payload.title === title);
      assert(d.payload.body === content);
      assert(d.topic === topic);
      firebaseAdminNode.onClose(null, done);
    }, e => {
      console.log(e);
      firebaseAdminNode.onClose(null, ()=>{done(1)});
    });
  });
});
