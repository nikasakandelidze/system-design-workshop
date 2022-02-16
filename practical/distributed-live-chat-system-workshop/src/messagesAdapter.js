const redis = require("redis");
const APPID = process.env.APPID;
const CHANNEL_NAME = "message-channel";

//publisher of data to redis
const publisherClient = redis.createClient({ host: "rds", port: 6379 });

//subscriber to data from redis
const subscriberClient = redis.createClient({ host: "rds", port: 6379 });

subscriberClient.on("subscribe", (channel, count) => {
  console.log(
    `Application with id of :${APPID} subscribed to redis queue channel: ${channel}.`
  );
});

exports.initializeSubscriberMessageListener = (handleMessageCallback) => {
  console.log("Initializing message queue listener callback");

  subscriberClient.on("message", (channel, message) => {
    console.log(`Got message from message queue: ${message}`);
    handleMessageCallback(message);
  });

  subscriberClient.subscribe(CHANNEL_NAME);
};

exports.publishMessage = (message) => {
  publisherClient.publish(CHANNEL_NAME, `${APPID}:${message}`);
};
