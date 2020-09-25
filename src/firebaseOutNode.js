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

  if (!payload || Array.isArray(payload) || typeof payload !== 'object' || Object.keys(payload).length === 0){
    out({'payload': 'MessageId not returned'})
    return;
  }

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

  this.messaging.send(message)
  .then((response) => {
    if (response.includes("/messages/")){
      out(msg);
    } else {
      out({'payload': 'MessageId not returned: ' + JSON.stringify(response)})
    }
  })
  .catch((error) => {
    out({'payload': 'MessageId not returned: ' + JSON.stringify(error)})
  });
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
