function FirebaseOutNode(config) {
  if (!config.admin) {
    throw "No firebase admin specified";
  }

  this.messaging = config.admin.messaging;
	this.onStatus = ()=>{}
}

FirebaseOutNode.prototype.onInput = function(msg, out, errorcb) {
  // send msg, on ok call out, error call errorcb
  const { topic, payload } = msg;
  const { title, body } = payload;

  this.messaging.sendToTopic(topic, {"notification": {"title":title,"body":body}})
  .then((response) => {
    if (response.messageId){
      out(msg);
    } else {
      errorcb('MessageId not returned')
    }
  })
  .catch((error) => {
    errorcb(error);
  });
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
