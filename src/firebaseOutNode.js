function FirebaseOutNode(config) {
  if (!config.admin) {
    throw "No firebase admin specified";
  }

	this.onStatus = ()=>{}
}

FirebaseOutNode.prototype.onInput = function(msg, out, errorcb) {
  // send msg, on ok call out, error call errorcb
  out(msg);
};

FirebaseOutNode.prototype.setStatusCallback = function(cb) {
	this.onStatus = cb;
};

module.exports = FirebaseOutNode
