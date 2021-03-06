const FirebaseOutNode = require('./firebaseOutNode');

function validateNodeConfig(n){
  if (!n.admin) {
    throw "No admin specified";
  }
}

module.exports = function(RED) {
  "use strict";

  function FirebaseOut(n) {
    validateNodeConfig(n)

    RED.nodes.createNode(this,n);
    var node = this;

    node.admin = RED.nodes.getNode(n.admin);
    node.kind = n.kind === "notification" ? "notification" : "data";

    const firebaseOutNode = new FirebaseOutNode(node)
    firebaseOutNode.setStatusCallback(node.status.bind(node))

    node.on('input', msg => {
      firebaseOutNode.onInput(msg, node.send.bind(node))
    })
  }

  RED.nodes.registerType("firebase cloud messaging", FirebaseOut);
}


