function FirebaseOutNode(config) {
  if (!config.admin) {
    throw "No firebase admin specified";
  }

  this.messaging = config.admin.messaging;
  this.kind = config.kind === "notification" ? "notification" : "data";
	this.onStatus = ()=>{}
}

FirebaseOutNode.prototype.onInput = function(msg, out) {
  // send msg, on ok call out, error call errorcb
  const { topic, payload, token } = msg;
  const message = {};
  message[this.kind] = payload;

  if (token){
    message.token = token;
    message.android = {
      "ttl": 0
    };
  } else {
    message.topic = topic;
    message.android = {
      "ttl": 60000
    };
  }

  console.log(message);

  this.messaging.send(message)
  .then((response) => {
    if (response.messageId){
      out(msg);
    } else {
      msg.payload = 'MessageId not returned';
      out(msg);
    }
  })
  .catch((error) => {
    msg.payload = 'MessageId not returned';
    msg.firebaseError = error;
    out(msg);
  });
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
