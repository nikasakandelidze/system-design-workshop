const express = require("express");
const ws = require("websocket");
const app = express();
const WebSocketServer = ws.server;
const messagesAdapter = require("./messagesAdapter");

const APPID = process.env.APPID;

const clientConnections = [];

const server = app.listen(8080, () => {
  console.log(`Server started on ${8080} port`);
});

const websocketServer = new WebSocketServer({
  httpServer: server,
});

messagesAdapter.initializeSubscriberMessageListener((msg) => {
  clientConnections.forEach((c) => c.send(`${msg}`));
});

websocketServer.on("request", (request) => {
  console.log("New websocket connection request.");
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened"));
  connection.on("close", () => console.log("closed"));
  connection.on("message", (msg) => {
    messagesAdapter.publishMessage(msg.utf8Data);
  });

  connection.on("disconnect", () => {
    console.log("disconnecting");
  });

  clientConnections.push(connection);
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
