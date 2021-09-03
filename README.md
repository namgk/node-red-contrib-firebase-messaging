# Upgrading to version 1.x.x
New versions starting from 1.0.0 externalize the admin configuration node, so you need to install node-red-contrib-firebase-admin-config before installing and using this node:

    npm i node-red-contrib-firebase-admin-config
    
Also due to naming conflicts, some of the node names have been changed, if you seen a node is not found when starting Node-RED, just delete them from the editor and re-add them from the pallete.

# Communicate with Google Firebase real-time database

These nodes use the new firebase-admin API and service account json is used for authentication.

## To run test, create a file in the top folder:

    touch my-firebase-service-credential.json

Setup a firebase project, get and paste the service account json to this file.

Then do

    npm run test

## Push notification for single device

If you want to send a message to a single device, you should configure the node to be of type "Data" and inject to the node the following msg format:

```json
{
   "payload": "<any object data>",
   "token": "<fcm token>"
}
```

## Push notification for all devices

Send the following payload:

```json
{
  "title": "<notification title>",
  "body": "<body>"
}
```
