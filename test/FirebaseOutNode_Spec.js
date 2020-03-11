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
    const key1 = "atitle"
    const key2 = "acontent";

    firebaseOutNode.onInput({
      payload: { key1, key2 },
      topic
    }, d => {
      assert(d.payload.key1 === key1);
      assert(d.payload.key2 === key2);
      assert(d.topic === topic);
      firebaseAdminNode.onClose(null, done);
    });
  });

  it('Output properly on failed case: string payload', function(done) {
    this.timeout(3000);

    const firebaseAdminNode = new FirebaseAdminNode({
      serviceAccountJson: serviceAccountJson
    });

    const firebaseOutNode = new FirebaseOutNode({
      admin: firebaseAdminNode
    });

    firebaseOutNode.onInput({
      payload: "a string",
      topic: "atopic"
    }, d => {
      assert(d.payload === 'MessageId not returned');
      assert(d.topic === undefined);
      firebaseAdminNode.onClose(null, done);
    });
  });

  it('Output properly on failed case: array payload', function(done) {
    this.timeout(3000);

    const firebaseAdminNode = new FirebaseAdminNode({
      serviceAccountJson: serviceAccountJson
    });

    const firebaseOutNode = new FirebaseOutNode({
      admin: firebaseAdminNode
    });

    firebaseOutNode.onInput({
      payload: ["a string"],
      topic: "atopic"
    }, d => {
      assert(d.payload === 'MessageId not returned');
      assert(d.topic === undefined);
      firebaseAdminNode.onClose(null, done);
    });
  });

  it('Output properly on failed case: empty object payload', function(done) {
    this.timeout(3000);

    const firebaseAdminNode = new FirebaseAdminNode({
      serviceAccountJson: serviceAccountJson
    });

    const firebaseOutNode = new FirebaseOutNode({
      admin: firebaseAdminNode
    });

    firebaseOutNode.onInput({
      payload: {},
      topic: "atopic"
    }, d => {
      assert(d.payload === 'MessageId not returned');
      assert(d.topic === undefined);
      firebaseAdminNode.onClose(null, done);
    });
  });
});
