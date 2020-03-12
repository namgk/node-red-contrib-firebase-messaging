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
  const { topic, payload } = msg;
  const message = {};
  message[this.kind] = payload;

  this.messaging.sendToTopic(topic, message)
  .then((response) => {
    if (response.messageId){
      out(msg);
    } else {
      out({'payload': 'MessageId not returned'})
    }
  })
  .catch((error) => {
    out({'payload': 'MessageId not returned'})
  });
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
